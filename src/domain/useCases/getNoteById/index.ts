import { NoteRepository } from "@/domain/repositories/NoteRepository";
import Note, { NoteProps } from "@/domain/entities/Note";

export class GetNoteById {
  constructor(private _noteRepository: NoteRepository) {}

  async execute(noteId: string): Promise<Note> {
    const noteModel = await this._noteRepository.getNoteById(noteId);
    const noteProps: NoteProps = {
      id: noteModel.id,
      pin: noteModel.pin,
      tags: noteModel.tags,
      uuid: noteModel.uuid,
      color: noteModel.color,
      title: noteModel.title,
      userId: noteModel.userId,
      content: noteModel.content,
      updatedAt: noteModel.updatedAt,
      createdAt: noteModel.createdAt,
    };
    return new Note(noteProps);
  }
}
