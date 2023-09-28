import { makeAutoObservable } from "mobx";

class CategoryStore {
  newCategory = false;
  categoryUpdated = false;

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
