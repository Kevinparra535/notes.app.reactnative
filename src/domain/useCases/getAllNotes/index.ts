import { NoteRepository } from "@/domain/repositories/NoteRepository";
import Note, { NoteProps } from "@/domain/entities/Note";

export class GetAllNotes {
  constructor(private _noteRepository: NoteRepository) {}

  async execute(): Promise<any> {
    const noteModel = await this._noteRepository.getAllNotes();
    return noteModel;
  }

  async excecuteChanges(uuid: string, data: Record<string, any>): Promise<any> {
    const noteModel = await this._noteRepository.updateContent(uuid, data);
    return noteModel;
  }
}
