import { useState, useEffect } from "react";
import Note from "@/domain/entities/Note";
import { GetAllNotes } from "@/domain/useCases/getAllNotes";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";
import { FirebaseNoteDatasource } from "@/data/network/FirebaseNoteDatasource";

export const NotesViewModel = () => {
  const [notes, setNotes] = useState<Array<Note> | null>(null);
  const datasource = new FirebaseNoteDatasource();
  const getAllNotes: GetAllNotes = new GetAllNotes(
    new NoteRepositoryImpl(datasource)
  );

  const fetchNotes = async () => {
    const result: Promise<Array<Note>> = await getAllNotes.execute();
    console.log(result)
    setNotes(await result);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return notes;
};
