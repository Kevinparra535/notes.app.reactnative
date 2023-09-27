import Category from "@/domain/entities/Category";

import { ResponseModel } from "../models/ResponseModel";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { CategoryService } from "../services/CategoryService";

export class NetworkCategoryDatasource implements CategoryRepository {
  private static instance: NetworkCategoryDatasource;
  private service: CategoryService;

  private constructor() {
    this.service = new CategoryService();
  }

  public getAll(): Promise<ResponseModel<Array<Category>>> {
    return this.service.fetchAll();
  }

  async create(data: Record<string, string>): Promise<any> {
    return this.service.create(data);
  }

  public static getInstance(): NetworkCategoryDatasource {
    if (!this.instance) {
      this.instance = new NetworkCategoryDatasource();
    }
    return this.instance;
  }
}
