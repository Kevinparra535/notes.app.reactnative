import { NoteRepository } from "@/domain/repositories/NoteRepository";
import { FirebaseNoteDatasource } from "../network/FirebaseNoteDatasource";
import { NoteModel } from "../models/NoteModel";

export class NoteRepositoryImpl implements NoteRepository {
  constructor(private datasource: FirebaseNoteDatasource) {}

  async getAllNotes(): Promise<Array<NoteModel>> {
    return this.datasource.getAllNotes();
  }

  async getNoteById(noteId: string): Promise<NoteModel> {
    return this.datasource.getNoteById(noteId);
  }
}
