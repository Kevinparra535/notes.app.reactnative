import { TYPES } from '@/config/types';
import User from '@/domain/entities/User';
import { SessionRepository } from '@/domain/repositories/SessionRepository';
import { inject, injectable } from 'inversify';
import { UseCase } from '../UseCase';

@injectable()
export class CheckActiveSessionUseCase implements UseCase<any, User> {
  constructor(@inject(TYPES.SessionRepository) private repository: SessionRepository) {}

  async run(): Promise<User> {
    return this.repository.checkActiveSession();
  }
}
