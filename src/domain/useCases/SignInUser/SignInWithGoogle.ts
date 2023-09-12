import Session from "@/domain/entities/Session";
import { SessionRepository } from "@/domain/repositories/SessionRepository";

export class SignInWithGoogle {
  constructor(private _sessionRepository: SessionRepository) {}

  async execute(): Promise<any> {
    return this._sessionRepository.loginWithProvider();
  }
}
