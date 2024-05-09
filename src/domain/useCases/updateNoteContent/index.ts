import { inject, injectable } from 'inversify';

import Note from '@/domain/entities/Note';
import { NoteRepository } from '@/domain/repositories/NoteRepository';

import { TYPES } from '@/config/types';
import { UseCase } from '../UseCase';

type IParams = {
  noteId: string;
  newData: Record<string, any>;
};


@injectable()
export class UpdateNoteContentUseCase implements UseCase<IParams, Note> {
  constructor(@inject(TYPES.NoteRepository) private respository: NoteRepository) {}

  async run(data: IParams): Promise<Note> {
    const { noteId, newData } = data;
    const note = await this.respository.getNoteById(noteId);

    try {
      await this.respository.updateContent(noteId, newData);
    } catch (error) {
      console.log('USE CASE UPDATE NOTE ===>: ', error);
    }

    return note;
  }
}
