import User from "@/domain/entities/User";
import { SessionRepository } from "@/domain/repositories/SessionRepository";

export class CheckActiveSession {
  constructor(private _sessionRepository: SessionRepository) {}

  async execute(): Promise<User> {
    return this._sessionRepository.checkActiveSession();
  }
}
