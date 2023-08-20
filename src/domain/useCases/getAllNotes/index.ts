import { NoteRepository } from "@/domain/repositories/NoteRepository";
import Note, { NoteProps } from "@/domain/entities/Note";

export class GetAllNotes {
  constructor(private _noteRepository: NoteRepository) {}

  async execute(): Promise<any> {
    const noteModel = await this._noteRepository.getAllNotes();
    return noteModel;
  }
}
