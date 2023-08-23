import { useState, useEffect } from "react";
import Note from "@/domain/entities/Note";
import { GetAllNotes } from "@/domain/useCases/getAllNotes";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";
import { NetworkNoteDatasource } from "@/ui/store/NetworkNoteDatasource";
import { NoteModel } from "@/data/models/NoteModel";
import { ResponseModel } from "@/data/models/ResponseModel";

export const NotesViewModel = () => {
  const [notes, setNotes] = useState<ResponseModel<Array<NoteModel>>>({
    status: "loading",
  });

  const datasource = new NetworkNoteDatasource();
  const getAllNotes: GetAllNotes = new GetAllNotes(
    new NoteRepositoryImpl(datasource)
  );

  const fetchNotes = async (): Promise<void> => {
    const result: ResponseModel<Array<NoteModel>> = await getAllNotes.execute();
    setNotes(result);
    console.log('Me ejecuto')
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { data: notes, refresh: fetchNotes };
};
