import { makeAutoObservable } from "mobx";

class CategoryStore {
  categoryUpdated = false;
  newCategory = false;

  constructor() {
    makeAutoObservable(this);
  }

  setNewCategory(status: boolean) {
    this.newCategory = status;
  }

  setCategoryUpdated(status: boolean) {
    this.categoryUpdated = status;
  }
}

const categoryStore = new CategoryStore();
export default categoryStore;
