import User from "@/domain/entities/User";
import { AuthService } from "../services/AuthService";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class NetworkUserDatasource implements UserRepository {
  private static instance: NetworkUserDatasource;
  private service: AuthService;

  private constructor() {
    this.service = new AuthService();
  }

  async getUser(data: Record<string, string>): Promise<User> {
    return this.service.loginUser(data);
  }

  async updateUser(data: Record<string, unknown>): Promise<User> {
    return this.service.updateUser(data);
  }

  async deleteUser(data: Record<string, string>): Promise<User> {
    return this.service.deleteUser(data);
  }

  public static getInstance(): NetworkUserDatasource {
    if (!this.instance) {
      this.instance = new NetworkUserDatasource();
    }
    return this.instance;
  }
}
