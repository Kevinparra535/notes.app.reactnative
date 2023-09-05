import User from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class UpdateUser {
  constructor(private _userRepository: UserRepository) {}

  async execute(data: Record<string, unknown>): Promise<User> {
    return this._userRepository.updateUser(data);
  }
}
