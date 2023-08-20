import { NoteRepository } from "@/domain/repositories/NoteRepository";
import { NoteModel } from "../models/NoteModel";
import { FirebaseService } from "../services/FirebaseService";

export class NetworkNoteDatasource implements NoteRepository {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  async getAllNotes(): Promise<Array<NoteModel>> {
    return this.firebaseService.fetchAllNotes();
  }

  async getNoteById(noteId: string): Promise<NoteModel> {
    return this.firebaseService.fetchNoteById(noteId);
  }
}
