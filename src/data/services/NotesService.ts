import {
  db,
  doc,
  auth,
  query,
  where,
  addDoc,
  orderBy,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "@/config/firebaseConfig";

import Note from "@/domain/entities/Note";
import { ResponseModel } from "../models/ResponseModel";
import { NotesCacheManager } from "@/ui/store/NotesCacheManager";

export class NotesService {
  private cacheManager = new NotesCacheManager();
  private collectionName: string = "notes";

  private async processSnapshot(snapshot: any): Promise<Array<Note>> {
    const formatedResponse: Array<Note> = [];
    snapshot.docChanges().forEach((change: any) => {
      const docData: Note = { uuid: change.doc.id, ...change.doc.data() };
      if (["added", "modified"].includes(change.type))
        formatedResponse.push(docData);
      if (change.type === "removed") {
        const indexToRemove = formatedResponse.findIndex(
          (item) => item.uuid === change.doc.id
        );
        if (indexToRemove !== -1) formatedResponse.splice(indexToRemove, 1);
      }
    });
    return formatedResponse;
  }

  private getQuery(userUid: string, additionalConditions: any[] = []): any {
    const notesCol = collection(db, this.collectionName);
    return query(
      notesCol,
      where("userId", "==", userUid),
      ...additionalConditions
    );
  }

  private async fetchNotes(
    queryConditions: any[]
  ): Promise<ResponseModel<Array<Note>>> {
    const user = auth.currentUser;
    if (!user || !user.uid)
      return { status: "error", error: "User is not authenticated" };

    return new Promise((resolve, reject) => {
      const q = this.getQuery(user.uid, queryConditions);
      const unsub = onSnapshot(
        q,
        async (snapshot: any) => {
          try {
            const formatedResponse = await this.processSnapshot(snapshot);
            resolve({ status: "success", data: formatedResponse });
          } catch (error: any) {
            reject({ status: "error", error: error.message });
          }
        },
        (error: { message: any; }) => reject({ status: "error", error: error.message })
      );

      return unsub;
    });
  }

  async fetchAllNotes(): Promise<ResponseModel<Array<Note>>> {
    return this.fetchNotes([orderBy("updatedAt", "desc")]);
  }

  async fetchFavoritesNotes(): Promise<ResponseModel<Array<Note>>> {
    return this.fetchNotes([
      where("pin", "==", true),
      orderBy("updatedAt", "desc"),
    ]);
  }

  async createNote(data: Record<string, string>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collectionName), {
      ...data,
      tags: [],
      pin: false,
      color: "#FFFFFF",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  }

  async fetchNoteById(noteId: string): Promise<Note> {
    return new Promise((resolve, reject) => {
      const unsub = onSnapshot(
        doc(db, this.collectionName, noteId),
        (docSnap) => {
          if (!docSnap.exists()) return reject(new Error("Note not found"));
          resolve(docSnap.data() as Note);
          unsub();
        }
      );
    });
  }

  async updateNoteContent(
    noteId: string,
    data: Record<string, any>
  ): Promise<void> {
    await updateDoc(doc(db, this.collectionName, noteId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    this.cacheManager.clear(noteId);
  }

  async deleteNote(noteId: string): Promise<void> {
    await deleteDoc(doc(db, this.collectionName, noteId));
  }
}
