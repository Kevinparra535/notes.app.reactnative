import { AuthService } from "../services/AuthService";
import Session from "@/domain/entities/Session";
import { SessionRepository } from "@/domain/repositories/SessionRepository";

export class NetworkSessionDatasource implements SessionRepository {
  private static instance: NetworkSessionDatasource;
  private service: AuthService;

  private constructor() {
    this.service = new AuthService();
  }

  async loginUser(data: Record<string, string>): Promise<Session> {
    return this.service.loginUser(data);
  }

  async loginWithProvider(): Promise<any> {
    return this.service.loginGoogle();
  }

  async checkActiveSession(): Promise<Session> {
    return this.service.checkSession();
  }

  async registerUser(data: Record<string, string>): Promise<Session> {
    return this.service.registerUser(data);
  }

  public static getInstance(): NetworkSessionDatasource {
    if (!this.instance) {
      this.instance = new NetworkSessionDatasource();
    }
    return this.instance;
  }
}
