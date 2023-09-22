import { makeAutoObservable, reaction, runInAction } from "mobx";
import Toast from "react-native-root-toast";

import { NoteModel } from "@/data/models/NoteModel";
import { ResponseModel } from "@/data/models/ResponseModel";

import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";

import { DeleteNote } from "@/domain/useCases/deleteNote";
import { GetFavoritesNotes } from "@/domain/useCases/getFavoritesNotes";
import { UpdateNoteContent } from "@/domain/useCases/updateNoteContent";

import { TranslateHelper } from "@/ui/i18n";
import notesStore from "@/ui/store/NotesStore";
import { debounce } from "@/ui/utils/Deboucing";


export class FavoritesViewModel {
  private deleteNote: DeleteNote;
  private getNotes: GetFavoritesNotes;
  private updateNoteContent: UpdateNoteContent;
  private noteRepositoryImpl: NoteRepositoryImpl;
  private datasource: NetworkNoteDatasource =
    NetworkNoteDatasource.getInstance();

  private toastMessage: any;

  public notes: ResponseModel<Array<NoteModel>> = {
    status: "loading",
  };

  constructor() {
    makeAutoObservable(this);
    this.noteRepositoryImpl = new NoteRepositoryImpl(this.datasource);
    this.getNotes = new GetFavoritesNotes(this.noteRepositoryImpl);
    this.updateNoteContent = new UpdateNoteContent(this.noteRepositoryImpl);
    this.deleteNote = new DeleteNote(this.noteRepositoryImpl);

    this.fetchNote();

    reaction(
      () => notesStore.noteUpdated,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setNoteUpdated(false);
        }
      }
    );
  }

  private setToastMessage(message: string) {
    this.toastMessage = Toast.show(message, {
      duration: Toast.durations.LONG,
    });
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
      () => notesStore.noteUpdated,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setNoteUpdated(false);
        }
      }
    );
  }

  setfavoritesNote(noteId: string, newData: Record<string, boolean>) {
    const fun = debounce(async (newData: Record<string, any>) => {
      try {
        await this.updateNoteContent.execute(noteId, newData);

        this.setToastMessage(
          newData.pin === true
            ? TranslateHelper("messages.notes.favorites.success")
            : TranslateHelper("messages.notes.favorites.removed")
        );

        runInAction(() => {
          notesStore.setNoteUpdated(true);
        });
      } catch (error) {
        console.log("FavoritesViewModel.setfavoritesNote.error:", error);
        this.setToastMessage(TranslateHelper("messages.notes.favorites.error"));
      }
    }, 500);

    fun(newData);
  }

  async deleteNotes(noteId: string) {
    try {
      await this.deleteNote.execute(noteId);

      this.setToastMessage(TranslateHelper("messages.notes.delete.success"));

      runInAction(() => {
        notesStore.setNoteUpdated(true);
      });
    } catch (error) {
      console.log("FavoritesViewModel.setfavoritesNote.error:", error);
      this.setToastMessage(TranslateHelper("messages.notes.delete.error"));
    }
  }
}