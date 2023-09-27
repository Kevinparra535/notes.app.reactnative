import { action, makeAutoObservable, reaction, runInAction } from "mobx";

import { GetCategories } from "@/domain/useCases/getCategories";
import { CreateCategory } from "@/domain/useCases/createCategory";

import { NetworkCategoryDatasource } from "@/data/network/NetworkCategoryDatasource";
import { CategoryRepositoryImpl } from "@/data/repositories/CategoryRepositoryImpl";

import { CategoryModel } from "@/data/models/CategoryModel";
import { ResponseModel } from "@/data/models/ResponseModel";

import categoryStore from "@/ui/store/CategoryStore";


export class CategoriesViewModel {
  private getData: GetCategories;
  private createCategory: CreateCategory;
  private repositoryImpl: CategoryRepositoryImpl;
  private datasource: NetworkCategoryDatasource =
    NetworkCategoryDatasource.getInstance();

  public showCreateCatInput: boolean = false;
  public categoryIdToEdit: string | null = null;

  public categories: ResponseModel<Array<CategoryModel>> = {
    status: "loading",
  };

  constructor() {
    makeAutoObservable(this, {
      setShowCatInput: action,
      setCategoryId: action,
    });

    this.repositoryImpl = new CategoryRepositoryImpl(this.datasource);
    this.getData = new GetCategories(this.repositoryImpl);
    this.createCategory = new CreateCategory(this.repositoryImpl);

    this.fetchData();


    reaction(
      () => categoryStore.newCategory,
      (newVal) => {
        if (newVal) {
          this.refresh();
        }
      }
    );
  }

  public setShowCatInput(status: boolean) {
    this.showCreateCatInput = status;
  }

  public setCategoryId(id: string | null) {
    this.categoryIdToEdit = id;
  }

  private setData(data: ResponseModel<Array<any>>) {
    this.categories = data;
  }

  private async fetchData(): Promise<void> {
    const result: ResponseModel<Array<CategoryModel>> = await this.getData.execute();
    this.setData(result);
  }

  public refresh(): void {
    this.fetchData();
  }

  public async create(data: Record<string, string>) {
    try {
      const response = await this.createCategory.execute(data);

      runInAction(() => {
        categoryStore.setNewCategory(true);
      });

    } catch (error) {
      console.log("CreateCategoryViewModel.create.error:", error);
    }
  }

  public update(data: Record<string, string>) {
    console.log("UPDATE CATEGORY", this.categoryIdToEdit, data);
  }

  public delete(uuid: string): void {
    console.log("DELETE CATEGORIE", uuid);
  }
}
