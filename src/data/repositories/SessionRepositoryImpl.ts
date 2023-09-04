import Session from "@/domain/entities/Session";
import { NetworkNoteDatasource } from "../network/NetworkNoteDatasource";

export class SessionRepositoryImpl {
  constructor(private datasource: NetworkNoteDatasource) {}

  async createUser(): Promise<void> {}

  async updateUser(): Promise<void> {}

  async getUser(data: Record<string, string>): Promise<Session> {
    return this.datasource.getUser(data);
  }

  async deleteUser(): Promise<void> {}
}
