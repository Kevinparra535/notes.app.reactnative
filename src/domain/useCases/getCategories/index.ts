import { CategoriesRepository } from "@/domain/repositories/CategoriesRepository";

export class GetCategories {
  constructor(private _repository: CategoriesRepository) {}

  async execute(): Promise<any> {
    const model = await this._repository.getAll();
    return model;
  }
}
