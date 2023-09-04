import Session from "@/domain/entities/Session";
import { SessionRepository } from "@/domain/repositories/SessionRepository";

export class SignInWithEmailAndPassword {
  constructor(private _noteRepository: SessionRepository) {}

  async execute(data: Record<string, string>): Promise<Session> {
    return this._noteRepository.getUser(data);
  }
}
