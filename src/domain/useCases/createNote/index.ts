import { NoteRepository } from "@/domain/repositories/NoteRepository";
import Note, { NoteProps } from "@/domain/entities/Note";

export class CreateNote {
  private _noteRepository: NoteRepository;

  constructor(private noteRepository: NoteRepository) {
    this._noteRepository = noteRepository;
  }

  async execute(userId: string, data: Record<string, string>): Promise<void> {
    const noteModel = await this._noteRepository.createNote(userId, data);
    return noteModel;
  }
}
