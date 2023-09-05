import User from "@/domain/entities/User";
import { FirebaseService } from "../services/FirebaseService";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class NetworkUserDatasource implements UserRepository {
  private static instance: NetworkUserDatasource;
  private firebaseService: FirebaseService;

  private constructor() {
    this.firebaseService = new FirebaseService();
  }

  async getUser(data: Record<string, string>): Promise<User> {
    return this.firebaseService.loginUser(data);
  }

  async updateUser(data: Record<string, unknown>): Promise<User> {
    return this.firebaseService.updateUser(data);
  }

  async deleteUser(data: Record<string, string>): Promise<User> {
    return this.firebaseService.deleteUser(data);
  }

  public static getInstance(): NetworkUserDatasource {
    if (!this.instance) {
      this.instance = new NetworkUserDatasource();
    }
    return this.instance;
  }
}
