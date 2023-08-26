import Note from "@/domain/entities/Note";
import { makeAutoObservable } from "mobx";
import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";
import { CreateNote } from "@/domain/useCases/createNote";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";
import { debounce } from "@/ui/utils/Deboucing";

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

  private newNoteContent = {};

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
      this.newNoteContent = { ...this.newNoteContent, ...newData };
      this.setSynced();
    }, 1000);

    fun(newData);
  }

  async saveAndCreateNewNote() {
    try {
      await this.createNote.execute(this.userId, this.newNoteContent);
    } catch (error) {
      console.log("CreateNotesViewModel.handleNoteChange.error:", error);
      this.setSyncError("Failed to fetch note.");
    }
  }
}
