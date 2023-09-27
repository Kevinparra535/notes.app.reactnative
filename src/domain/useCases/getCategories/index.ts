import Category from "@/domain/entities/Category";
import { ResponseModel } from "@/data/models/ResponseModel";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";

export class GetCategories {
  constructor(private _repository: CategoryRepository) {}

  async execute(): Promise<any> {
    const model = await this._repository.getAll();
    return model;
  }
}
