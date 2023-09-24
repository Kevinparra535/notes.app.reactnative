import { makeAutoObservable } from "mobx";

class NotesStore {
  noteUpdated = false;
  noteAddedFavorite = false
  newNoteCreated = false;

  constructor() {
    makeAutoObservable(this);
  }

  setNewNoteCreated(status: boolean) {
    this.newNoteCreated = status;
  }

  setNoteUpdated(status: boolean) {
    this.noteUpdated = status;
  }

  setNoteAddedFavorite(status: boolean) {
    this.noteAddedFavorite = status;
  }
}

const notesStore = new NotesStore();
export default notesStore;
