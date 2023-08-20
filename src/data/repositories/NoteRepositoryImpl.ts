import { NoteRepository } from "@/domain/repositories/NoteRepository";
import { NetworkNoteDatasource } from "../network/NetworkNoteDatasource";
import { NoteModel } from "../models/NoteModel";

export class NoteRepositoryImpl implements NoteRepository {
  constructor(private datasource: NetworkNoteDatasource) {}

  async getAllNotes(): Promise<Array<NoteModel>> {
    return this.datasource.getAllNotes();
  }

  async getNoteById(noteId: string): Promise<NoteModel> {
    return this.datasource.getNoteById(noteId);
  }
}
