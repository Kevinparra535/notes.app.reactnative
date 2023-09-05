import User from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { NetworkUserDatasource } from "../network/NetworkUserDatasource";

export class UserRepositoryImpl implements UserRepository {
  constructor(private datasource: NetworkUserDatasource) {}

  async updateUser(data: Record<string, unknown>): Promise<User> {
    return this.datasource.updateUser(data);
  }

  async getUser(data: Record<string, string>): Promise<User> {
    return this.datasource.getUser(data);
  }

  async deleteUser(): Promise<void> {}
}
