import Category from "@/domain/entities/Category";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";

export class UpdateCategory {
  private _repository: CategoryRepository;

  constructor(private repository: CategoryRepository) {
    this._repository = repository;
  }

  async execute(id: string, data: Record<string, any>): Promise<Category> {
    const response = await this._repository.getById(id);

    try {
      await this._repository.update(id, data);
    } catch (error) {
      console.log("USE CASE UPDATE CATEGORY ===>: ", error);
    }

    return response;
  }
}
