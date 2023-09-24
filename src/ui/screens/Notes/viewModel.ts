import { makeAutoObservable, reaction, runInAction } from "mobx";
import { TranslateHelper } from "@/ui/i18n";
import Toast from "react-native-root-toast";

import { DeleteNote } from "@/domain/useCases/deleteNote";
import { GetAllNotes } from "@/domain/useCases/getAllNotes";
import { UpdateNoteContent } from "@/domain/useCases/updateNoteContent";

import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";

import { NoteModel } from "@/data/models/NoteModel";
import { ResponseModel } from "@/data/models/ResponseModel";

import notesStore from "@/ui/store/NotesStore";
import { debounce } from "@/ui/utils/Deboucing";

export class NotesViewModel {
  private deleteNote: DeleteNote;
  private getNotes: GetAllNotes;
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
    this.getNotes = new GetAllNotes(this.noteRepositoryImpl);
    this.updateNoteContent = new UpdateNoteContent(this.noteRepositoryImpl);
    this.deleteNote = new DeleteNote(this.noteRepositoryImpl);

    this.fetchNote();

    reaction(
      () => notesStore.newNoteCreated,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setNewNoteCreated(false);
        }
      }
    );

    reaction(
      () => notesStore.noteUpdated,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setNoteUpdated(false);
        }
      }
    );

    reaction(
      () => notesStore.noteAddedFavorite,
      (newVal) => {
        if (newVal) {
          this.refresh();
        }
      }
    );
  }

  private setToastMessage(message: string) {
    this.toastMessage = Toast.show(message, {
      duration: Toast.durations.SHORT,
      shadow: true,
      animation: true,
      hideOnPress: true,
    });

    setTimeout(() => {
      Toast.hide(this.toastMessage);
    }, Toast.durations.SHORT);
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
      () => notesStore.newNoteCreated,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setNewNoteCreated(false);
        }
      }
    );

    reaction(
      () => notesStore.noteUpdated,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setNoteUpdated(false);
        }
      }
    );

    reaction(
      () => notesStore.noteAddedFavorite,
      (newVal) => {
        if (newVal) {
          this.refresh();
        }
      }
    );
  }

  public setfavoritesNote(noteId: string, newData: Record<string, boolean>) {
    const fun = debounce(async (newData: Record<string, any>) => {
      try {
        await this.updateNoteContent.execute(noteId, newData);

        this.setToastMessage(
          newData.pin === true
            ? TranslateHelper("messages.notes.favorites.success")
            : TranslateHelper("messages.notes.favorites.removed")
        );

        runInAction(() => {
          notesStore.setNoteAddedFavorite(true);
        });
      } catch (error) {
        console.log("NotesViewModel.setfavoritesNote.error:", error);
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
        notesStore.setNoteAddedFavorite(true);
      });
    } catch (error) {
      console.log("NotesViewModel.setfavoritesNote.error:", error);
      this.setToastMessage(TranslateHelper("messages.notes.delete.error"));
    }
  }
}
