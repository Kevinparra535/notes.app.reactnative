import { FirebaseService } from "../services/FirebaseService";
import Session from "@/domain/entities/Session";
import { SessionRepository } from "@/domain/repositories/SessionRepository";

export class NetworkSessionDatasource implements SessionRepository {
  private static instance: NetworkSessionDatasource;
  private firebaseService: FirebaseService;

  private constructor() {
    this.firebaseService = new FirebaseService();
  }

  async loginUser(data: Record<string, string>): Promise<Session> {
    return this.firebaseService.loginUser(data);
  }

  async registerUser(data: Record<string, string>): Promise<Session> {
    return this.firebaseService.registerUser(data);
  }

  public static getInstance(): NetworkSessionDatasource {
    if (!this.instance) {
      this.instance = new NetworkSessionDatasource();
    }
    return this.instance;
  }
}
