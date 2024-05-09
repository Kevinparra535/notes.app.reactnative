import { inject, injectable } from 'inversify';

import Note from '@/domain/entities/Note';
import { ResponseModel } from '../models/ResponseModel';
import { NoteRepository } from '@/domain/repositories/NoteRepository';

import { NotesService } from '../services/NotesService';

import { TYPES } from '@/config/types';

@injectable()
export class NoteRepositoryImpl implements NoteRepository {
  constructor(@inject(TYPES.NotesService) private service: NotesService) {}

  async getAllNotes(): Promise<ResponseModel<Array<Note>>> {
    return await this.service.fetchAllNotes();
  }

  async getFavoritesNotes(): Promise<ResponseModel<Array<Note>>> {
    return await this.service.fetchFavoritesNotes();
  }

  async createNote(data: Record<string, string>): Promise<string> {
    return await this.service.createNote(data);
  }

  async getNoteById(noteId: string): Promise<Note> {
    return await this.service.fetchNoteById(noteId);
  }

  async updateContent(noteId: string, data: Record<string, any>): Promise<void> {
    return await this.service.updateNoteContent(noteId, data);
  }

  async deleteNote(noteId: string): Promise<void> {
    await this.service.deleteNote(noteId);
  }
}
