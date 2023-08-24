import {
  db,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
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

    const formatedResponse: Array<Note> = [];

    try {
      const notesCol = collection(db, this.collectionName);
      const docs = await getDocs(notesCol);

      docs.forEach((doc: { id: string; data: () => any }) => {
        formatedResponse.push({ uuid: doc.id, ...doc.data() });
      });

      // this.cacheManager.set(cacheKey, formatedResponse);

      return { status: "success", data: formatedResponse };
    } catch (error: any) {
      return { status: "error", error: error.message };
    }
  }

  async fetchNoteById(noteId: nodeId): Promise<Note> {
    // if (this.cacheManager.has(noteId)) {
    //   return this.cacheManager.get(noteId);
    // }

    const notesCol = doc(db, this.collectionName, noteId);
    const docSnap = await getDoc(notesCol);

    if (docSnap.exists()) {
      const noteData: Note = docSnap.data() as Note;
      // this.cacheManager.set(noteId, noteData);
      return noteData;
    } else {
      throw new Error("Note not found");
    }
  }

  async updateNoteContent(
    noteId: nodeId,
    data: Record<string, string>
  ): Promise<void> {
    const notesRef = doc(db, this.collectionName, noteId);
    const updatedData = {
      ...data,
      updated: serverTimestamp(),
    };
    await updateDoc(notesRef, updatedData);
    this.cacheManager.clear(noteId);
  }
}
