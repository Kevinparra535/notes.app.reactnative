import { makeAutoObservable, reaction, runInAction } from "mobx";

import { DeleteNote } from "@/domain/useCases/deleteNote";
import { GetFavoritesNotes } from "@/domain/useCases/getFavoritesNotes";
import { UpdateNoteContent } from "@/domain/useCases/updateNoteContent";

import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";

import { NoteModel } from "@/data/models/NoteModel";
import { ResponseModel } from "@/data/models/ResponseModel";

import notesStore from "@/ui/store/NotesStore";

export class FavoritesViewModel {
  private getNotes: GetFavoritesNotes;
  private noteRepositoryImpl: NoteRepositoryImpl;
  private datasource: NetworkNoteDatasource =
    NetworkNoteDatasource.getInstance();

  public notes: ResponseModel<Array<NoteModel>> = {
    status: "loading",
  };

  constructor() {
    makeAutoObservable(this);
    this.noteRepositoryImpl = new NoteRepositoryImpl(this.datasource);
    this.getNotes = new GetFavoritesNotes(this.noteRepositoryImpl);

    reaction(
      () => notesStore.noteAddedFavorite,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setNoteAddedFavorite(false);
        }
      }
    );

    this.fetchNote();
  }

  private setNotes(notes: ResponseModel<Array<NoteModel>>) {
    this.notes = notes;
  }

  private async fetchNote(): Promise<void> {
    const result: ResponseModel<Array<NoteModel>> =
      await this.getNotes.execute();

    this.setNotes(result);
  }

  public refresh(): void {
    this.fetchNote();

    reaction(
      () => notesStore.noteAddedFavorite,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setNoteAddedFavorite(false);
        }
      }
    );
  }
}
