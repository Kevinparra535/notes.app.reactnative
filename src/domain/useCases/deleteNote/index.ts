import { NoteRepository } from "@/domain/repositories/NoteRepository";

export class DeleteNote {
  constructor(private _noteRepository: NoteRepository) {}

  async execute(uuid: string): Promise<any> {
    const noteModel = await this._noteRepository.deleteNote(uuid);
    return noteModel;
  }
}
