import { inject, injectable } from 'inversify';

import { NoteRepository } from '@/domain/repositories/NoteRepository';

import { TYPES } from '@/config/types';
import { UseCase } from '../UseCase';

@injectable()
export class GetAllNotesUseCase implements UseCase<any, any> {
  constructor(@inject(TYPES.NoteRepository) private respository: NoteRepository) {}

  async run(): Promise<any> {
    const noteModel = await this.respository.getAllNotes();
    return noteModel;
  }
}
