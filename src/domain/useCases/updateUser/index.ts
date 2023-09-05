import User from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class UpdateUser {
  constructor(private _noteRepository: UserRepository) {}

  async execute(data: Record<string, unknown>): Promise<User> {
    return this._noteRepository.updateUser(data);
  }
}
