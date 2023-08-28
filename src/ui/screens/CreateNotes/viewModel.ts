import Note from "@/domain/entities/Note";
import { action, makeAutoObservable, runInAction } from "mobx";
import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";
import { CreateNote } from "@/domain/useCases/createNote";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";
import { debounce } from "@/ui/utils/Deboucing";
import notesStore from "@/ui/store/NotesStore";

export class CreateNotesViewModel {
  private userId: string;
  public note: Note | null = null;
  private datasource: NetworkNoteDatasource =
    NetworkNoteDatasource.getInstance();
  private createNote: CreateNote;

  public isLoading: boolean = true;
  public isSyncing: boolean = false;
  public lastSynced: { seconds: number; nanoseconds: number } | null = null;
  public syncError: string | null = null;
  public error: string | null | unknown = null;

  public newNoteCreated: boolean = false;
  public newNoteContent = {
    title: "",
    content: "",
    userId: "",
  };

  constructor(userId: string) {
    makeAutoObservable(this);
    this.userId = userId;
    this.createNote = new CreateNote(new NoteRepositoryImpl(this.datasource));
  }

  private setSyncing() {
    this.isSyncing = true;
    this.syncError = null;
  }

  private setSynced() {
    const now = new Date().getTime();
    const totalSeconds = now / 1000;
    const seconds = Math.floor(totalSeconds);
    const nanoseconds = Math.floor((totalSeconds - seconds) * 1e9);

    this.isSyncing = false;
    this.lastSynced = { seconds, nanoseconds };
  }

  private setSyncError(error: string) {
    this.isSyncing = false;
    this.syncError = error;
  }

  handleNoteChange(newData: Record<string, string>) {
    this.setSyncing();

    const fun = debounce(async (newData: Record<string, string>) => {
      runInAction(() => {
        this.newNoteContent = {
          ...this.newNoteContent,
          ...newData,
          userId: this.userId,
        };
      });
      this.setSynced();
    }, 500);

    fun(newData);
  }

  async saveAndCreateNewNote() {
    if (this.newNoteContent.title || this.newNoteContent.content) {
      try {
        const response = await this.createNote.execute(this.newNoteContent);
        console.log("CreateNotesViewModel.saveAndCreateNewNote: ", response);
        runInAction(() => {
          this.newNoteContent.title = "";
          this.newNoteContent.content = "";
          this.newNoteCreated = true;
          notesStore.setNewNoteCreated(true);
        });
      } catch (error) {
        console.log("CreateNotesViewModel.handleNoteChange.error:", error);
        this.setSyncError("Failed to fetch note.");
      }
    }
  }
}
