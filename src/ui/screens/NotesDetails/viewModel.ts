import { useState, useEffect, useMemo } from "react";
import Note from "@/domain/entities/Note";
import { GetNoteById } from "@/domain/useCases/getNoteById";
import { UpdateNoteContent } from "@/domain/useCases/updateNoteContent";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";
import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";
import { debounce } from "@/ui/utils/Deboucing";
import { makeAutoObservable } from "mobx";

// export const NotesDetailsViewModel = (noteId: string) => {
//   // Estados
//   const [note, setNote] = useState<Note | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Funciones
//   const datasource = NetworkNoteDatasource.getInstance();
//   const getNoteById: GetNoteById = new GetNoteById(
//     new NoteRepositoryImpl(datasource)
//   );

//   const updateNoteContent: UpdateNoteContent = new UpdateNoteContent(
//     new NoteRepositoryImpl(datasource)
//   );

//   const fetchNote = async () => {
//     try {
//       setIsLoading(true);
//       const response: Note = await getNoteById.execute(noteId);
//       console.log("fetchNote", response);
//       setNote(response);
//     } catch (error) {
//       setError("Failed to fetch the note.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleNoteChange = debounce(async (newData: Record<string, string>) => {
//     if (!note) return;

//     // note.setSyncing();

//     try {
//       await updateNoteContent.execute(noteId, newData);
//       // note.setSynced();
//     } catch (error) {
//       console.log('handleNoteChange.error:', error)
//       note.setSyncError("Failed to sync the note.");
//     }
//   }, 500);

//   useEffect(() => {
//     fetchNote();
//   }, [noteId]);

//   return { note, isLoading, error, handleNoteChange };
// };

export class NotesDetailsViewModel {
  private noteId: string;
  public note: Note | null = null;
  private getNoteById: GetNoteById;
  public isLoading: boolean = true;
  public isSyncing: boolean = false;
  public lastSynced: Date | null = null;
  public syncError: string | null = null;
  private updateNoteContent: UpdateNoteContent;
  public error: string | null | unknown = null;
  private datasource: NetworkNoteDatasource =
    NetworkNoteDatasource.getInstance();

  constructor(noteId: string) {
    makeAutoObservable(this);
    this.noteId = noteId;
    this.getNoteById = new GetNoteById(new NoteRepositoryImpl(this.datasource));
    this.updateNoteContent = new UpdateNoteContent(
      new NoteRepositoryImpl(this.datasource)
    );

    this.fetchNote();
  }

  private setSyncing() {
    this.isSyncing = true;
    this.syncError = null;
  }

  private setSynced() {
    this.isSyncing = false;
    this.lastSynced = new Date();
  }

  private setSyncError(error: string) {
    this.isSyncing = false;
    this.syncError = error;
  }

  private setLoading(state: boolean) {
    this.isLoading = state;
  }

  private setNote(note: Note) {
    this.note = note;
    console.log(note)
  }

  private setError(error: string | unknown) {
    this.error = error;
  }

  async fetchNote(): Promise<void> {
    try {
      const response: Note = await this.getNoteById.execute(this.noteId);
      this.setNote(response);
      this.setLoading(false);
    } catch (error) {
      console.log("NotesDetailsViewModel.fetchNotes.error ==> ", error);
      this.setError(error);
    } finally {
      this.setLoading(false);
    }
  }

  handleNoteChange(newData: Record<string, string>) {
    this.setSyncing();

    if (!this.note) return;

    const fun = debounce(async (newData: Record<string, string>) => {
      try {
        await this.updateNoteContent.execute(this.noteId, newData);
        this.setSynced();
      } catch (error) {
        console.log("NotesDetailsViewModel.handleNoteChange.error:", error);
        this.setSyncError("Failed to fetch note.");
      }
    }, 1000);

    fun(newData);
  }
}
