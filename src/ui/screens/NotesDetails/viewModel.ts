import { useState, useEffect, useMemo } from "react";
import Note from "@/domain/entities/Note";
import { GetNoteById } from "@/domain/useCases/getNoteById";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";
import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";

export const NotesDetailsViewModel = (noteId: string) => {
  const [note, setNote] = useState<Note | null>(null);
  const datasource = NetworkNoteDatasource.getInstance();
  const getNoteById: GetNoteById = useMemo(() => new GetNoteById(new NoteRepositoryImpl(datasource)), []);

  const fetchNote = async () => {
    const result: any = await getNoteById.execute(noteId);
    setNote(result);
  };

  useEffect(() => {
    fetchNote();
  }, [noteId]);

  return { note };
};
