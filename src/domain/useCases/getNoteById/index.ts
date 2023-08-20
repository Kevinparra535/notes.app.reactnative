
import { NoteRepository } from "@/domain/repositories/NoteRepository";
import Note, { NoteProps } from "@/domain/entities/Note";

export class GetNoteById {
  constructor(private _noteRepository: NoteRepository) {}

  async execute(noteId: string): Promise<Note> {
    const noteModel = await this._noteRepository.getNoteById(noteId);
    const noteProps: NoteProps = {
      id: noteModel.id,
      uuid: noteModel.uuid,
      title: noteModel.title,
      content: noteModel.content
    };
    return new Note(noteProps);
  }
}
