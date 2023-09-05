import Session from "@/domain/entities/Session";
import { NetworkSessionDatasource } from "../network/NetworkSessionDatasource";
import { SessionRepository } from "@/domain/repositories/SessionRepository";

export class SessionRepositoryImpl implements SessionRepository {
  constructor(private datasource: NetworkSessionDatasource) {}

  async registerUser(data: Record<string, string>): Promise<Session> {
    return this.datasource.registerUser(data);
  }

  async loginUser(data: Record<string, string>): Promise<Session> {
    return this.datasource.loginUser(data);
  }
}
