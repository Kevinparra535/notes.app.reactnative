import { CategoryRepository } from "@/domain/repositories/CategoryRepository";

export class DeleteCategory {
  constructor(private _repository: CategoryRepository) {}

  async execute(id: string): Promise<any> {
    const model = await this._repository.delete(id);
    return model;
  }
}
