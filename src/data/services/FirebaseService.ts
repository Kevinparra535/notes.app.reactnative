import {
  db,
  doc,
  query,
  addDoc,
  setDoc,
  orderBy,
  updateDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "@/config/firebaseConfig";
import Note from "@/domain/entities/Note";
import { ResponseModel } from "../models/ResponseModel";
import { NotesCacheManager } from "../../ui/store/NotesCacheManager";

type nodeId = string;

export class FirebaseService {
  private cacheManager = new NotesCacheManager();
  private collectionName: string = "notes";

  async fetchAllNotes(): Promise<ResponseModel<Array<Note>>> {
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
      const q = query(notesCol, orderBy("updatedAt", "desc"));

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

  async createNote(userId: string, data: Record<string, string>): Promise<any> {
    const docRef = await addDoc(collection(db, this.collectionName), {
      userId,
      tags: [],
      pin: false,
      color: "#FFFFFF",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...data,
    });

    console.log("FirebaseService: Create Note => ", docRef.id);
  }

  async fetchNoteById(noteId: nodeId): Promise<Note> {
    return new Promise((resolve, reject) => {
      // Establece el listener
      const unsub = onSnapshot(
        doc(db, this.collectionName, noteId),
        (docSnap) => {
          // Se puede descomentar si quieres saber si los datos provienen del servidor o del cache local
          // const source = docSnap.metadata.hasPendingWrites ? "Local" : "Server";
          // console.log(source, " data: ", docSnap.data());

          if (docSnap.exists()) {
            const noteData: Note = docSnap.data() as Note;
            resolve(noteData);

            // Después de obtener los datos por primera vez, desvincula el listener
            unsub();
          } else {
            reject(new Error("Note not found"));

            // Después de recibir el error, desvincula el listener
            unsub();
          }
        }
      );
    });
  }

  async updateNoteContent(
    noteId: nodeId,
    data: Record<string, string>
  ): Promise<void> {
    const notesRef = doc(db, this.collectionName, noteId);
    const updatedData = {
      ...data,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(notesRef, updatedData);
    this.cacheManager.clear(noteId);
  }
}
