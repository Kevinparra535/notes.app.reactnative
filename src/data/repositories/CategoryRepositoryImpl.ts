import Category from "@/domain/entities/Category";
import { ResponseModel } from "../models/ResponseModel";
import { NetworkCategoryDatasource } from "../network/NetworkCategoryDatasource";

export class CategoryRepositoryImpl {
  constructor(private datasource: NetworkCategoryDatasource) {}

  async getById(id: string): Promise<Category> {
    return this.datasource.getById(id);
  }

  async delete(id: string): Promise<void> {
    return this.datasource.delete(id);
  }

  async getAll(): Promise<ResponseModel<Array<Category>>> {
    return this.datasource.getAll();
  }

  async create(data: Record<string, string>): Promise<string> {
    return this.datasource.create(data);
  }

  async update(id: string, data: Record<string, any>): Promise<void> {
    this.datasource.update(id, data);
  }
}
