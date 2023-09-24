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

  async fetchAllNotes(): Promise<ResponseModel<Array<Note>>> {
    const user = auth.currentUser;

    // const cacheKey = "all-notes";

    // if (this.cacheManager.has(cacheKey)) {
    //   return { status: "success", data: this.cacheManager.get(cacheKey) };
    // }

    // const formatedResponse: Array<Note> = [];

    // try {
    //   const notesCol = collection(db, this.collectionName);
    //   const q = query(notesCol, orderBy("updated", "desc"));

    //   const docs = await getDocs(q);

    //   docs.forEach((doc: { id: string; data: () => any }) => {
    //     formatedResponse.push({ uuid: doc.id, ...doc.data() });
    //   });

    //   // this.cacheManager.set(cacheKey, formatedResponse);

    //   return { status: "success", data: formatedResponse };
    // } catch (error: any) {
    //   return { status: "error", error: error.message };
    // }

    return new Promise((resolve, reject) => {
      const formatedResponse: Array<Note> = [];
      const notesCol = collection(db, this.collectionName);
      const q = query(
        notesCol,
        where("userId", "==", user?.uid),
        orderBy("updatedAt", "desc")
      );

      // Set up the listener
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added" || change.type === "modified") {
              const docData: any = {
                uuid: change.doc.id,
                ...change.doc.data(),
              };
              formatedResponse.push(docData);
            }
            if (change.type === "removed") {
              const indexToRemove = formatedResponse.findIndex(
                (item) => item.uuid === change.doc.id
              );
              if (indexToRemove !== -1) {
                formatedResponse.splice(indexToRemove, 1);
              }
            }
          });
          resolve({ status: "success", data: formatedResponse });
        },
        (error) => {
          reject({ status: "error", error: error.message });
        }
      );

      return unsub;
    });
  }

  async fetchFavoritesNotes(): Promise<ResponseModel<Array<Note>>> {
    const user = auth.currentUser;

    return new Promise((resolve, reject) => {
      const formatedResponse: Array<Note> = [];
      const notesCol = collection(db, this.collectionName);
      const q = query(
        notesCol,
        where("userId", "==", user?.uid),
        where("pin", "==", true),
        orderBy("updatedAt", "desc")
      );

      // Set up the listener
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added" || change.type === "modified") {
              const docData: any = {
                uuid: change.doc.id,
                ...change.doc.data(),
              };
              formatedResponse.push(docData);
            }
            if (change.type === "removed") {
              const indexToRemove = formatedResponse.findIndex(
                (item) => item.uuid === change.doc.id
              );
              if (indexToRemove !== -1) {
                formatedResponse.splice(indexToRemove, 1);
              }
            }
          });
          resolve({ status: "success", data: formatedResponse });
        },
        (error) => {
          reject({ status: "error", error: error.message });
        }
      );

      return unsub;
    });
  }

  async createNote(data: Record<string, string>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collectionName), {
      tags: [],
      pin: false,
      color: "#FFFFFF",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...data,
    });

    return docRef.id;
  }

  async fetchNoteById(noteId: string): Promise<Note> {
    return new Promise((resolve, reject) => {
      const unsub = onSnapshot(
        doc(db, this.collectionName, noteId),
        (docSnap) => {
          if (docSnap.exists()) {
            const noteData: Note = docSnap.data() as Note;
            resolve(noteData);

            unsub();
          } else {
            reject(new Error("Note not found"));

            unsub();
          }
        }
      );
    });
  }

  async updateNoteContent(
    noteId: string,
    data: Record<string, any>
  ): Promise<void> {
    const notesRef = doc(db, this.collectionName, noteId);
    const updatedData = {
      ...data,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(notesRef, updatedData);
    this.cacheManager.clear(noteId);
  }

  async deleteNote(noteId: string): Promise<void> {
    const notesRef = doc(db, this.collectionName, noteId);
    await deleteDoc(notesRef);
  }
}
