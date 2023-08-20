
import { INoteRepository } from "@/domain/repositories/INoteRepository";
import Note, { NoteProps } from "@/domain/entities/Note";

export class GetNoteById {
  constructor(private _noteRepository: INoteRepository) {}

  async execute(noteId: string): Promise<Note> {
    const noteModel = await this._noteRepository.getNoteById(noteId);
    const noteProps: NoteProps = {
      id: noteModel.id,
      title: noteModel.title,
      content: noteModel.content
    };
    return new Note(noteProps);
  }
}
