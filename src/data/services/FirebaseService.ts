import { db, doc, getDoc, collection, getDocs } from "@/config/firebaseConfig";
import { NoteModel } from "../models/NoteModel";
import { ResponseModel } from "../models/ResponseModel";

export class FirebaseService {
  async fetchAllNotes(): Promise<ResponseModel<Array<NoteModel>>> {
    const formatedResponse: Array<NoteModel> = [];

    try {
      const notesCol = collection(db, "notes");
      const docs = await getDocs(notesCol);

      docs.forEach((doc: { id: string; data: () => any }) => {
        formatedResponse.push({ uuid: doc.id, ...doc.data() });
      });

      return { status: "success", data: formatedResponse };
    } catch (error: any) {
      return { status: "error", error: error.message };
    }
  }

  async fetchNoteById(noteId: string): Promise<NoteModel> {
    const notesCol = doc(db, "notes", noteId);
    const docSnap = await getDoc(notesCol);

    if (docSnap.exists()) {
      return docSnap.data() as NoteModel;
    } else {
      throw new Error("Note not found");
    }
  }
}
