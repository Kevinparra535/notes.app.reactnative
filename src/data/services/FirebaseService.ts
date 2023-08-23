import { db, doc, getDoc, collection, getDocs } from "@/config/firebaseConfig";
import { NoteModel } from "../models/NoteModel";
import { ResponseModel } from "../models/ResponseModel";
import { NotesCacheManager } from "../network/NotesCacheManager";

export class FirebaseService {
  private cacheManager = new NotesCacheManager();

  async fetchAllNotes(): Promise<ResponseModel<Array<NoteModel>>> {
    const cacheKey = "all-notes";

    if (this.cacheManager.has(cacheKey)) {
      return { status: "success", data: this.cacheManager.get(cacheKey) };
    }

    const formatedResponse: Array<NoteModel> = [];

    try {
      const notesCol = collection(db, "notes");
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

  async fetchNoteById(noteId: string): Promise<NoteModel> {
    if (this.cacheManager.has(noteId)) {
      return this.cacheManager.get(noteId);
    }

    const notesCol = doc(db, "notes", noteId);
    const docSnap = await getDoc(notesCol);

    if (docSnap.exists()) {
      const noteData: NoteModel = docSnap.data() as NoteModel;
      this.cacheManager.set(noteId, noteData);
      return noteData;
    } else {
      throw new Error("Note not found");
    }
  }
}
