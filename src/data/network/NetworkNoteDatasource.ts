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

  async getAllNotes(): Promise<ResponseModel<Array<Note>>> {
    return this.firebaseService.fetchAllNotes();
  }

  async createNote(userId: string, data: Record<string, string>): Promise<void> {
    this.firebaseService.createNote(userId, data);
  }

  async getNoteById(noteId: string): Promise<Note> {
    return this.firebaseService.fetchNoteById(noteId);
  }

  async updateContent(noteId: string, data: Record<string, string>): Promise<void> {
    this.firebaseService.updateNoteContent(noteId, data);
  }

  public static getInstance(): NetworkNoteDatasource {
    if (!this.instance) {
      this.instance = new NetworkNoteDatasource();
    }
    return this.instance;
  }
}
