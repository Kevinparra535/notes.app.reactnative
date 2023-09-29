import { makeAutoObservable } from "mobx";

class NotesStore {
  noteUpdated = false;
  noteAddedFavorite = false
  newNoteCreated = false;
  categoryAdded = false


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

  setCategoryAdded(status: boolean) {
    this.categoryAdded = status;
  }
}

const notesStore = new NotesStore();
export default notesStore;
