import { NoteRepository } from "@/domain/repositories/NoteRepository";
import Note, { NoteProps } from "@/domain/entities/Note";

export class CreateNote {
  private _noteRepository: NoteRepository;

  constructor(private noteRepository: NoteRepository) {
    this._noteRepository = noteRepository;
  }

  async execute(data: Record<string, string>): Promise<string> {
    const noteModel = await this._noteRepository.createNote(data);
    return noteModel;
  }
}
