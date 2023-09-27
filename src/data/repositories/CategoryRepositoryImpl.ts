import Category from "@/domain/entities/Category";
import { ResponseModel } from "../models/ResponseModel";
import { NetworkCategoryDatasource } from "../network/NetworkCategoryDatasource";

export class CategoryRepositoryImpl {
  constructor(private datasource: NetworkCategoryDatasource) {}

  async getAll(): Promise<ResponseModel<Array<Category>>> {
    return this.datasource.getAll();
  }

  async create(data: Record<string, string>): Promise<string> {
    return this.datasource.create(data);
  }
}
