import { db, doc, getDoc, collection, getDocs } from "@/config/firebaseConfig";
import { NoteRepository } from "@/domain/repositories/NoteRepository";
import { NoteModel } from "../models/NoteModel";

export class FirebaseNoteDatasource implements NoteRepository {
  async getAllNotes(): Promise<Array<NoteModel>> {
    const formatedResponse: Array<NoteModel> = [];
    const notesCol = collection(db, "notes");
    const docs = await getDocs(notesCol);

    docs.forEach((doc: { id: string; data: () => any }) => {
      formatedResponse.push({ uuid: doc.id, ...doc.data() });
    });

    return formatedResponse as Array<NoteModel>;
  }

  async getNoteById(noteId: string): Promise<NoteModel> {
    const notesCol = doc(db, "notes", noteId);
    const docSnap = await getDoc(notesCol);

    if (docSnap.exists()) {
      console.log("FirebaseNoteDatasource:", docSnap.data());
      return docSnap.data() as NoteModel;
    } else {
      console.log("FirebaseNoteDatasource: No such document!");
      throw new Error("Note not found");
    }
  }
}
