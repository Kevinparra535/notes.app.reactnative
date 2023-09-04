import Note from "@/domain/entities/Note";
import { NoteRepository } from "@/domain/repositories/NoteRepository";
import { FirebaseService } from "../services/FirebaseService";
import { ResponseModel } from "../models/ResponseModel";

export class NetworkNoteDatasource implements NoteRepository {
  private static instance: NetworkNoteDatasource;
  private firebaseService: FirebaseService;

  private constructor() {
    this.firebaseService = new FirebaseService();
  }

  async getUser(data: Record<string, string>): Promise<any> {
    return this.firebaseService.getUser(data);
  }


  // Notes
  async getAllNotes(): Promise<ResponseModel<Array<Note>>> {
    return this.firebaseService.fetchAllNotes();
  }

  async createNote(data: Record<string, string>): Promise<string> {
    return this.firebaseService.createNote(data);
  }

  async getNoteById(noteId: string): Promise<Note> {
    return this.firebaseService.fetchNoteById(noteId);
  }

  async updateContent(
    noteId: string,
    data: Record<string, any>
  ): Promise<void> {
    this.firebaseService.updateNoteContent(noteId, data);
  }

  async deleteNote(noteId: string): Promise<void> {
    await this.firebaseService.deleteNote(noteId);
  }

  public static getInstance(): NetworkNoteDatasource {
    if (!this.instance) {
      this.instance = new NetworkNoteDatasource();
    }
    return this.instance;
  }
}
