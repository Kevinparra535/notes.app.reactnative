import { action, makeAutoObservable, reaction, runInAction } from "mobx";
import Toast from "react-native-root-toast";

import { GetCategories } from "@/domain/useCases/getCategories";
import { CreateCategory } from "@/domain/useCases/createCategory";
import { DeleteCategory } from "@/domain/useCases/deleteCategory";
import { UpdateCategory } from "@/domain/useCases/updateCategory";

import { NetworkCategoryDatasource } from "@/data/network/NetworkCategoryDatasource";
import { CategoryRepositoryImpl } from "@/data/repositories/CategoryRepositoryImpl";

import { CategoryModel } from "@/data/models/CategoryModel";
import { ResponseModel } from "@/data/models/ResponseModel";

import { TranslateHelper } from "@/ui/i18n";
import categoryStore from "@/ui/store/CategoryStore";
import notesStore from "@/ui/store/NotesStore";

export class CategoriesViewModel {
  private getData: GetCategories;
  private deleteCategory: DeleteCategory;
  private createCategory: CreateCategory;
  private updateCategory: UpdateCategory;
  private repositoryImpl: CategoryRepositoryImpl;
  private datasource: NetworkCategoryDatasource =
    NetworkCategoryDatasource.getInstance();

  private toastMessage: any;
  public modalIsVisible: boolean = false;
  public colorSelected: string = "#F4D5B6";
  public showCreateCatInput: boolean = false;
  public categoryIdToEdit: string | null = null;

  public categories: ResponseModel<Array<CategoryModel>> = {
    status: "loading",
  };

  constructor() {
    makeAutoObservable(this, {
      setColor: action,
      setCategoryId: action,
      setShowCatInput: action,
      setModalVisible: action,
    });

    this.repositoryImpl = new CategoryRepositoryImpl(this.datasource);
    this.getData = new GetCategories(this.repositoryImpl);
    this.createCategory = new CreateCategory(this.repositoryImpl);
    this.updateCategory = new UpdateCategory(this.repositoryImpl);
    this.deleteCategory = new DeleteCategory(this.repositoryImpl);

    reaction(
      () => categoryStore.newCategory,
      (newVal) => {
        if (newVal) {
          this.refresh();
          categoryStore.setNewCategory(false);
        }
      }
    );

    reaction(
      () => categoryStore.categoryUpdated,
      (newVal) => {
        if (newVal) {
          this.refresh();
          categoryStore.setCategoryUpdated(false);
        }
      }
    );

    this.fetchData();
  }

  public refresh(): void {
    this.fetchData();
  }

  public setColor(value: string) {
    this.colorSelected = value;
  }

  public setModalVisible(value: boolean) {
    this.modalIsVisible = value;
  }

  public setShowCatInput(status: boolean) {
    this.showCreateCatInput = status;
  }

  public setCategoryId(id: string | null) {
    this.categoryIdToEdit = id;
  }

  private setToastMessage(message: string) {
    this.toastMessage = Toast.show(message, {
      duration: Toast.durations.SHORT,
      shadow: true,
      animation: true,
      hideOnPress: true,
    });

    setTimeout(() => {
      Toast.hide(this.toastMessage);
    }, Toast.durations.SHORT);
  }

  async delete(id: string): Promise<void> {
    try {
      await this.deleteCategory.execute(id);

      this.setToastMessage(
        TranslateHelper("messages.categories.delete.success")
      );

      runInAction(() => {
        this.fetchData();
        notesStore.setNoteUpdated(true);
        notesStore.setNoteAddedFavorite(true);
        categoryStore.setCategoryUpdated(true);
      });
    } catch (error) {
      console.log("CategoriesViewModel.setfavoritesNote.error:", error);
      this.setToastMessage(TranslateHelper("messages.categories.delete.error"));
    }
  }

  private async fetchData(): Promise<void> {
    const result: ResponseModel<Array<CategoryModel>> =
      await this.getData.execute();
    this.setData(result);
  }

  private setData(data: ResponseModel<Array<any>>) {
    this.categories = data;
  }

  public async create(data: Record<string, string>) {
    this.setToastMessage(TranslateHelper("alerts.categories.create"));

    try {
      await this.createCategory.execute(data);

      runInAction(() => {
        this.fetchData();
        categoryStore.setNewCategory(true);
        notesStore.setNoteUpdated(true);
        notesStore.setNoteAddedFavorite(true);
      });
    } catch (error) {
      console.log("CreateCategoryViewModel.create.error:", error);
      this.setToastMessage(TranslateHelper("alerts.categories.error"));
    }
  }

  public async update(data: Record<string, string>) {
    if (this.categoryIdToEdit) {
      try {
        await this.updateCategory.execute(this.categoryIdToEdit, data);

        this.setToastMessage(TranslateHelper("alerts.categories.update"));

        runInAction(() => {
          this.refresh();
          notesStore.setNoteUpdated(true);
          categoryStore.setCategoryUpdated(true);
          notesStore.setNoteAddedFavorite(true);
        });
      } catch (error) {
        console.log("CategoriesViewModel.setfavoritesNote.error:", error);
        this.setToastMessage("error");
        this.setToastMessage(TranslateHelper("alerts.categories.error"));
      }
    }
  }
}
