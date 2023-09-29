import { action, makeAutoObservable, reaction, runInAction } from "mobx";

import { GetCategories } from "@/domain/useCases/getCategories";
import { AddCategoriesToNotes } from "@/domain/useCases/addCategoriesToNote";

import { NetworkCategoryDatasource } from "@/data/network/NetworkCategoryDatasource";
import { CategoryRepositoryImpl } from "@/data/repositories/CategoryRepositoryImpl";

import { CategoryModel } from "@/data/models/CategoryModel";
import { ResponseModel } from "@/data/models/ResponseModel";

import notesStore from "@/ui/store/NotesStore";

export class AssignCategoriesViewModel {
  private getData: GetCategories;
  private addTagsToNotes: AddCategoriesToNotes;
  private repositoryImpl: CategoryRepositoryImpl;
  private datasource: NetworkCategoryDatasource =
    NetworkCategoryDatasource.getInstance();

  private noteId: string | null = null;
  public categoriesSelected: Array<string> = [];

  public categories: ResponseModel<Array<CategoryModel>> = {
    status: "loading",
  };

  constructor(noteId: string, noteTags: Array<string>) {
    makeAutoObservable(this, {
      setCategory: action,
    });

    this.repositoryImpl = new CategoryRepositoryImpl(this.datasource);
    this.addTagsToNotes = new AddCategoriesToNotes(this.repositoryImpl);
    this.getData = new GetCategories(this.repositoryImpl);

    this.noteId = noteId;
    this.categoriesSelected = [...noteTags];

    reaction(
      () => notesStore.categoryAdded,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setCategoryAdded(false);
        }
      }
    );

    this.fetchData();
  }

  public refresh(): void {
    this.fetchData();

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

  private async setTagsToNotes() {
    try {
      if (this.noteId) {
        await this.addTagsToNotes.execute(this.noteId, this.categoriesSelected);

        runInAction(() => {
          this.refresh();
          notesStore.setCategoryAdded(true);
        });

        console.log("SET CATEGOIRES: ", this.noteId, this.categoriesSelected);
      }
    } catch (error) {
      console.log("ERROR AL ANADIR LAS CATEGORIAS", error);
    }
  }

  public setCategory(id: string): void {
    if (!this.categoriesSelected.includes(id)) {
      this.categoriesSelected = [...this.categoriesSelected, id];
    } else {
      this.categoriesSelected = this.categoriesSelected.filter(
        (item) => item !== id
      );
    }

    this.setTagsToNotes();
  }

  private async fetchData(): Promise<void> {
    const result: ResponseModel<Array<CategoryModel>> =
      await this.getData.execute();
    this.setData(result);
  }

  private setData(data: ResponseModel<Array<any>>) {
    this.categories = data;
  }
}
