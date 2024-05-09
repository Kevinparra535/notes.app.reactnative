import { inject, injectable } from 'inversify';
import { observable, makeAutoObservable } from 'mobx';

import User from '@/domain/entities/User';
import { CheckActiveSessionUseCase } from '@/domain/useCases/checkActiveSession';

import { TYPES } from '@/config/types';

@injectable()
export class AuthStore {
  @observable user: User | null = null;

  public isLoading: boolean = false;

  constructor(
    @inject(TYPES.CheckActiveSessionUseCase) private checkSession: CheckActiveSessionUseCase
  ) {
    makeAutoObservable(this);
  }

  private setLoading(state: boolean) {
    this.isLoading = state;
  }

  setUser(user: User | null) {
    this.user = user;
  }

  async checkActiveSession() {
    this.setLoading(true);

    try {
      const user = await this.checkSession.run();

      this.setLoading(false);

      if (user) {
        this.setUser(user);
        this.setLoading(false);
      } else {
        this.setUser(null);
        this.setLoading(false);
      }
    } catch (error) {
      this.setLoading(false);
      console.log('AuthStore.checkActiveSession: ', error);
    }
  }
}
