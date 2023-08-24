import { NoteRepository } from "@/domain/repositories/NoteRepository";
import { NetworkNoteDatasource } from "../network/NetworkNoteDatasource";
import Note from "@/domain/entities/Note";
import { ResponseModel } from "../models/ResponseModel";

export class NoteRepositoryImpl implements NoteRepository {
  constructor(private datasource: NetworkNoteDatasource) {}

  async getAllNotes(): Promise<ResponseModel<Array<Note>>> {
    return this.datasource.getAllNotes();
  }

  async getNoteById(noteId: string): Promise<Note> {
    return this.datasource.getNoteById(noteId);
  }

  async updateContent(noteId: string, data: Record<string, string>): Promise<void> {
    this.datasource.updateContent(noteId, data);
  }
}
