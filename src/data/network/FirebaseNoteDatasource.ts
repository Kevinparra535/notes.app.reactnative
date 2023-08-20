import { db } from "@/config/firebaseConfig";
import { NoteRepository } from "@/domain/repositories/NoteRepository";
import { doc, getDoc } from "firebase/firestore";
import { NoteModel } from "../models/NoteModel";

export class FirebaseNoteDatasource  implements NoteRepository {
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
