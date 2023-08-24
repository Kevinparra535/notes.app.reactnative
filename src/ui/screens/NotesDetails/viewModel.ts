import { useState, useEffect, useMemo } from "react";
import Note from "@/domain/entities/Note";
import { GetNoteById } from "@/domain/useCases/getNoteById";
import { UpdateNoteContent } from "@/domain/useCases/updateNoteContent";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";
import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";
import { debounce } from "@/ui/utils/Deboucing";

export const NotesDetailsViewModel = (noteId: string) => {
  // Estados
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Funciones
  const datasource = NetworkNoteDatasource.getInstance();
  const getNoteById: GetNoteById = new GetNoteById(
    new NoteRepositoryImpl(datasource)
  );

  const updateNoteContent: UpdateNoteContent = new UpdateNoteContent(
    new NoteRepositoryImpl(datasource)
  );

  const fetchNote = async () => {
    try {
      setIsLoading(true);
      const response: Note = await getNoteById.execute(noteId);
      console.log("fetchNote", response);
      setNote(response);
    } catch (error) {
      setError("Failed to fetch the note.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNoteChange = debounce(async (newData: Record<string, string>) => {
    if (!note) return;

    // note.setSyncing();

    try {
      await updateNoteContent.execute(noteId, newData);
      // note.setSynced();
    } catch (error) {
      console.log('handleNoteChange.error:', error)
      note.setSyncError("Failed to sync the note.");
    }
  }, 500);

  useEffect(() => {
    fetchNote();
  }, [noteId]);

  return { note, isLoading, error, handleNoteChange };
};
