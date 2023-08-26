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
  public lastSynced: Date | null = null;
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
    this.isSyncing = false;
    this.lastSynced = new Date();
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
    }, 1000);

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
