import { NoteRepository } from "@/domain/repositories/NoteRepository";
import Note from "@/domain/entities/Note";

export class UpdateNoteContent {
  private _noteRepository: NoteRepository;

  constructor(private noteRepository: NoteRepository) {
    this._noteRepository = noteRepository;
  }

  async execute(noteId: string, newData: Record<string, any>): Promise<Note> {
    const note = await this._noteRepository.getNoteById(noteId);

    // console.log("USE CASE UPDATE NOTE ===>: ", note);

    try {
      await this._noteRepository.updateContent(noteId, newData);
    } catch (error) {
      console.log("USE CASE UPDATE NOTE ===>: ", error);
    }

    return note;
  }
}
