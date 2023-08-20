import { useState, useEffect } from "react";
import Note from "@/domain/entities/Note";
import { GetNoteById } from "@/domain/useCases/getNoteById";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";
import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";

export const NotesDetailsViewModel = (noteId: string) => {
  const [note, setNote] = useState<Note | null>(null);
  const datasource = new NetworkNoteDatasource(); // Crea una instancia de tu Datasource
  const getNoteById: GetNoteById = new GetNoteById(
    new NoteRepositoryImpl(datasource)
  ); // Pasa el datasource al repositorio

  const fetchNote = async () => {
    const result: any = await getNoteById.execute(noteId);
    setNote(result);
  };

  useEffect(() => {
    fetchNote();
  }, [noteId]);

  return { note };
};
