import { NoteRepository } from "@/domain/repositories/NoteRepository";
import { NoteModel } from "../models/NoteModel";
import Note from "@/domain/entities/Note";
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

  async getNoteById(noteId: string): Promise<Note> {
    return this.firebaseService.fetchNoteById(noteId);
  }

  public static getInstance(): NetworkNoteDatasource {
    if (!this.instance) {
      this.instance = new NetworkNoteDatasource();
    }
    return this.instance;
  }
}
