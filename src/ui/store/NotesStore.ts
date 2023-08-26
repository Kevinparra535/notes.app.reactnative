import { makeAutoObservable } from "mobx";

class NotesStore {
  newNoteCreated = false;

  constructor() {
    makeAutoObservable(this);
  }

  setNewNoteCreated(status: boolean) {
    this.newNoteCreated = status;
  }
}

const notesStore = new NotesStore();
export default notesStore;
