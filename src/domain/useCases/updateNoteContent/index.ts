import { NoteRepository } from "@/domain/repositories/NoteRepository";
import Note from "@/domain/entities/Note";

export class UpdateNoteContent {
  private _noteRepository: NoteRepository;

  constructor(private noteRepository: NoteRepository) {
    this._noteRepository = noteRepository;
  }

  async execute(
    noteId: string,
    newData: Record<string, string>
  ): Promise<Note> {
    const note = await this._noteRepository.getNoteById(noteId);
    note.setSyncing();

    try {
      // Update the note in the database
      await this._noteRepository.updateContent(noteId, newData);

      // If successful, update the note entity to reflect the successful sync
      note.setSynced();
    } catch (error) {
      console.log("UpdateNoteContent: ", error);
      // Handle the error, update the note entity to reflect the sync error
      note.setSyncError("Failed to sync the note content.");
    }

    return note;
  }
}
