import { inject, injectable } from 'inversify';

import Session from '@/domain/entities/Session';
import { SessionRepository } from '@/domain/repositories/SessionRepository';

import { UseCase } from '../UseCase';
import { TYPES } from '@/config/types';

@injectable()
export class SignInWithEmailUseCase implements UseCase<Record<string, string>, Session> {
  constructor(@inject(TYPES.SessionRepository) private repository: SessionRepository) {}

  async run(data: Record<string, string>): Promise<Session> {
    return this.repository.loginUser(data);
  }
}
