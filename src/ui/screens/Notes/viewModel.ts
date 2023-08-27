import { GetAllNotes } from "@/domain/useCases/getAllNotes";
import { UpdateNoteContent } from "@/domain/useCases/updateNoteContent";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";
import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";
import { NoteModel } from "@/data/models/NoteModel";
import { ResponseModel } from "@/data/models/ResponseModel";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import notesStore from "@/ui/store/NotesStore";
import { debounce } from "@/ui/utils/Deboucing";
import Toast from "react-native-root-toast";

export class NotesViewModel {
  private getAllNotes: GetAllNotes;
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
    this.getAllNotes = new GetAllNotes(this.noteRepositoryImpl);
    this.updateNoteContent = new UpdateNoteContent(this.noteRepositoryImpl);

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
      await this.getAllNotes.execute();

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
  }

  setFavouritesNote(noteId: string, newData: Record<string, boolean>) {
    const fun = debounce(async (newData: Record<string, any>) => {
      try {
        await this.updateNoteContent.execute(noteId, newData);

        this.setToastMessage(
          `Note ${newData.pin ? "added to" : "removed of"}  favourites`
        );

        runInAction(() => {
          notesStore.setNoteUpdated(true);
        });
      } catch (error) {
        console.log("NotesViewModel.setFavouritesNote.error:", error);
      }
    }, 500);

    fun(newData);
  }

  deleteNote(noteId: string) {
    console.log("deleting note");
  }
}
