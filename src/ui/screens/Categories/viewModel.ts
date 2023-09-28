import { action, makeAutoObservable, reaction, runInAction } from "mobx";

import { GetCategories } from "@/domain/useCases/getCategories";
import { CreateCategory } from "@/domain/useCases/createCategory";

import { NetworkCategoryDatasource } from "@/data/network/NetworkCategoryDatasource";
import { CategoryRepositoryImpl } from "@/data/repositories/CategoryRepositoryImpl";

import { CategoryModel } from "@/data/models/CategoryModel";
import { ResponseModel } from "@/data/models/ResponseModel";

import categoryStore from "@/ui/store/CategoryStore";
import { debounce } from "@/ui/utils/Deboucing";
import { UpdateCategory } from "@/domain/useCases/updateCategory";
import Toast from "react-native-root-toast";
import { TranslateHelper } from "@/ui/i18n";

export class CategoriesViewModel {
  private getData: GetCategories;
  private createCategory: CreateCategory;
  private updateCategory: UpdateCategory;
  private repositoryImpl: CategoryRepositoryImpl;
  private datasource: NetworkCategoryDatasource =
    NetworkCategoryDatasource.getInstance();

  private toastMessage: any;
  public showCreateCatInput: boolean = false;
  public categoryIdToEdit: string | null = null;

  public error: unknown = null;
  public isLoading: boolean = true;
  public isSyncing: boolean = false;
  public syncError: string | null = null;
  public lastSynced: { seconds: number; nanoseconds: number } | null = null;

  public categories: ResponseModel<Array<CategoryModel>> = {
    status: "loading",
  };

  constructor() {
    makeAutoObservable(this, {
      setCategoryId: action,
      setShowCatInput: action,
    });

    this.repositoryImpl = new CategoryRepositoryImpl(this.datasource);
    this.getData = new GetCategories(this.repositoryImpl);
    this.createCategory = new CreateCategory(this.repositoryImpl);
    this.updateCategory = new UpdateCategory(this.repositoryImpl);

    this.fetchData();

    reaction(
      () => categoryStore.newCategory,
      (newVal) => {
        if (newVal) {
          this.refresh();
        }
      }
    );

    reaction(
      () => categoryStore.categoryUpdated,
      (newVal) => {
        if (newVal) {
          this.refresh();
        }
      }
    );
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

  public refresh(): void {
    this.fetchData();
  }

  public delete(uuid: string): void {
    console.log("DELETE CATEGORIE", uuid);
  }

  public setShowCatInput(status: boolean) {
    this.showCreateCatInput = status;
  }

  public setCategoryId(id: string | null) {
    this.categoryIdToEdit = id;
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
          this.fetchData();
          categoryStore.setCategoryUpdated(true);
        });
      } catch (error) {
        console.log("CategoriesViewModel.setfavoritesNote.error:", error);
        this.setToastMessage("error");
        this.setToastMessage(TranslateHelper("alerts.categories.error"));
      }
    }
  }
}
