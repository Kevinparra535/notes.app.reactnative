import { NoteRepository } from '@/domain/repositories/NoteRepository';
import { UseCase } from '../UseCase';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/config/types';

@injectable()
export class DeleteNoteUseCase implements UseCase<string, any> {
  constructor(@inject(TYPES.NoteRepository) private respository: NoteRepository) {}

  async run(uuid: string): Promise<any> {
    const noteModel = await this.respository.deleteNote(uuid);
    return noteModel;
  }
}
