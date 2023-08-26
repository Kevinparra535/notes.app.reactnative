import { makeAutoObservable } from "mobx";

class NotesStore {
  noteUpdated = false;
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
}

const notesStore = new NotesStore();
export default notesStore;
