import { inject, injectable } from 'inversify';

import Session from '@/domain/entities/Session';
import { AuthService } from '@/domain/services/auth';

import { SessionRepository } from '@/domain/repositories/SessionRepository';
import { TYPES } from '@/config/types';

@injectable()
export class SessionRepositoryImpl implements SessionRepository {
  constructor(@inject(TYPES.AuthService) private service: AuthService) {}

  checkActiveSession(): Promise<Session> {
    return this.service.checkSession();
  }

  async registerUser(data: Record<string, string>): Promise<Session> {
    return this.service.registerUser(data);
  }

  async loginUser(data: Record<string, string>): Promise<Session> {
    return this.service.loginUser(data);
  }

  async loginWithProvider(): Promise<Session> {
    return this.service.loginGoogle();
  }
}
