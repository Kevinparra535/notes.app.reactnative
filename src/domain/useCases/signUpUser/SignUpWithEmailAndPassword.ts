import Session from "@/domain/entities/Session";
import { SessionRepository } from "@/domain/repositories/SessionRepository";

export class SignUpWithEmailAndPassword {
  constructor(private _sessionRepository: SessionRepository) {}

  async execute(data: Record<string, string>): Promise<Session> {
    return this._sessionRepository.registerUser(data);
  }
}
