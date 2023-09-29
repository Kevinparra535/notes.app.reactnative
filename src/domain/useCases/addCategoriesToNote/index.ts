import Category from "@/domain/entities/Category";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";

export class AddCategoriesToNotes {
  private _repository: CategoryRepository;

  constructor(private repository: CategoryRepository) {
    this._repository = repository;
  }

  async execute(id: string, tags: Array<string>): Promise<void> {
    try {
      await this._repository.addTagsToNotes(id, tags);
    } catch (error) {
      console.log("USE CASE ADD CATEGORY TO NOTES ===>: ", error);
    }
  }
}
