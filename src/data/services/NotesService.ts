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
import { CategoryService } from "./CategoryService";
import Category from "@/domain/entities/Category";

export class NotesService {
  private cacheManager = new NotesCacheManager();
  private collectionName: string = "notes";
  private categoryService = new CategoryService();

  async fetchAllNotes(): Promise<ResponseModel<Array<Note>>> {
    return this.fetchNotes((user) => {
      const q = query(
        collection(db, this.collectionName),
        where("userId", "==", user?.uid),
        orderBy("updatedAt", "desc")
      );
      return q;
    });
  }

  async fetchFavoritesNotes(): Promise<ResponseModel<Array<Note>>> {
    return this.fetchNotes((user) => {
      const q = query(
        collection(db, this.collectionName),
        where("userId", "==", user?.uid),
        where("pin", "==", true),
        orderBy("updatedAt", "desc")
      );
      return q;
    });
  }

  private async fetchNotes(
    queryBuilder: (user: any) => any
  ): Promise<ResponseModel<Array<Note>>> {
    const user = auth.currentUser;

    return new Promise((resolve, reject) => {
      const formatedResponse: Array<Note> = [];
      const q = queryBuilder(user);

      const handleSnapshot = (snapshot: any) => {
        snapshot.docChanges().forEach(async (change: any) => {
          try {
            if (change.type === "added" || change.type === "modified") {
              const docData: Note = {
                ...change.doc.data(),
                uuid: change.doc.id,
                tags: await this.getCategoriesForNotes(change.doc.data().tags),
              };
              formatedResponse.push(docData);
            } else if (change.type === "removed") {
              const indexToRemove = formatedResponse.findIndex(
                (item) => item.uuid === change.doc.id
              );
              if (indexToRemove !== -1) {
                formatedResponse.splice(indexToRemove, 1);
              }
            }
            resolve({ status: "success", data: formatedResponse });
          } catch (error) {
            console.log("ERROR EN EL SERVICIO: FETCH ALL NOTES");
          }
        });
      };

      const unsub = onSnapshot(q, handleSnapshot, (error) => {
        reject({ status: "error", error: error.message });
      });

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

  async getCategoriesForNotes(categoryIds: Array<string>): Promise<Array<any>> {
    return Promise.all(
      categoryIds.map(async (categoryId) => {
        try {
          const response = await this.categoryService.getById(categoryId);
          return { ...response, uuid: categoryId };
        } catch (error: any) {
          console.error(
            `Error retrieving category with ID ${categoryId}: ${error.message}`
          );
          return null;
        }
      })
    );
  }
}
