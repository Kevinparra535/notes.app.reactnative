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

  async delete(id: string): Promise<void> {
    return this.service.delete(id);
  }

  async getById(id: string): Promise<Category> {
    return this.service.getById(id);
  }

  public getAll(): Promise<ResponseModel<Array<Category>>> {
    return this.service.fetchAll();
  }

  async create(data: Record<string, string>): Promise<any> {
    return this.service.create(data);
  }

  async update(id: string, data: Record<string, any>): Promise<void> {
    this.service.update(id, data);
  }

  async addTagsToNotes(id: string, tags: Array<string>): Promise<void> {
    this.service.addTagsToNotes(id, tags);
  }

  public static getInstance(): NetworkCategoryDatasource {
    if (!this.instance) {
      this.instance = new NetworkCategoryDatasource();
    }
    return this.instance;
  }
}
