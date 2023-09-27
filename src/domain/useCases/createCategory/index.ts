import { CategoryRepository } from "@/domain/repositories/CategoryRepository";

export class CreateCategory {
  private _repository: CategoryRepository;

  constructor(private repository: CategoryRepository) {
    this._repository = repository;
  }

  async execute(data: Record<string, string>): Promise<string> {
    const noteModel = await this._repository.create(data);
    return noteModel;
  }
}
