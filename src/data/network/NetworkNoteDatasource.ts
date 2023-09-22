import Note from "@/domain/entities/Note";
import { NoteRepository } from "@/domain/repositories/NoteRepository";
import { NotesService } from "../services/NotesService";
import { ResponseModel } from "../models/ResponseModel";

export class NetworkNoteDatasource implements NoteRepository {
  private static instance: NetworkNoteDatasource;
  private service: NotesService;

  private constructor() {
    this.service = new NotesService();
  }

  async getAllNotes(): Promise<ResponseModel<Array<Note>>> {
    return this.service.fetchAllNotes();
  }

  async createNote(data: Record<string, string>): Promise<any> {
    return this.service.createNote(data);
  }

  async getNoteById(noteId: string): Promise<Note> {
    return this.service.fetchNoteById(noteId);
  }

  async updateContent(
    noteId: string,
    data: Record<string, any>
  ): Promise<void> {
    this.service.updateNoteContent(noteId, data);
  }

  async deleteNote(noteId: string): Promise<void> {
    await this.service.deleteNote(noteId);
  }

  public static getInstance(): NetworkNoteDatasource {
    if (!this.instance) {
      this.instance = new NetworkNoteDatasource();
    }
    return this.instance;
  }
}
