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

export class FirebaseService {
  private cacheManager = new NotesCacheManager();
  private collectionName: string = "notes";

  async fetchAllNotes(): Promise<ResponseModel<Array<Note>>> {
    const cacheKey = "all-notes";
    console.log(this.cacheManager.has(cacheKey));

    if (this.cacheManager.has(cacheKey)) {
      return { status: "success", data: this.cacheManager.get(cacheKey) };
    }

    const formatedResponse: Array<Note> = [];
    try {
      const notesCol = collection(db, this.collectionName);
      const docs = await getDocs(notesCol);

      docs.forEach((doc: { id: string; data: () => any }) => {
        formatedResponse.push({ uuid: doc.id, ...doc.data() });
      });

      this.cacheManager.set(cacheKey, formatedResponse);

      return { status: "success", data: formatedResponse };
    } catch (error: any) {
      return { status: "error", error: error.message };
    }
  }

  async fetchNoteById(noteId: string): Promise<Note> {
    if (this.cacheManager.has(noteId)) {
      return this.cacheManager.get(noteId);
    }

    const notesCol = doc(db, this.collectionName, noteId);
    const docSnap = await getDoc(notesCol);

    if (docSnap.exists()) {
      const noteData: Note = docSnap.data() as Note;
      this.cacheManager.set(noteId, noteData);
      return noteData;
    } else {
      throw new Error("Note not found");
    }
  }

  async updateNoteTitle(nodeId: string, title: string): Promise<void> {
    const notesRef = doc(db, this.collectionName, nodeId);
    await updateDoc(notesRef, {
      title,
      timestamp: serverTimestamp()
    });
  }

  async updateNoteContent(nodeId: string, data: Record<string, string>): Promise<void> {
    const notesRef = doc(db, this.collectionName, nodeId);
    await updateDoc(notesRef, {
      title: data.title,
      content: data.content,
      timestamp: serverTimestamp()
    });
  }
}
