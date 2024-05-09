import { makeAutoObservable, observable, runInAction } from 'mobx';
import { inject, injectable } from 'inversify';

import User from '@/domain/entities/User';

import { SignInWithEmailUseCase } from '@/domain/useCases/signInWithEmailAndPassword';
import rootStore from '@/ui/store/RootStore';

import { TYPES } from '@/config/types';

export type ICalls = 'user';

@injectable()
export class LoginViewModel {
  @observable isUserLoading: boolean = false;
  @observable isUserError: string | null = null;
  @observable isUserResponse: User | null = null;

  constructor(@inject(TYPES.SignInWithEmailUseCase) private signInEmail: SignInWithEmailUseCase) {
    makeAutoObservable(this);
  }

  public async signInWithEmailAndPassword(data: Record<string, string>): Promise<void> {
    this.updateLoadingState(true, null, 'user');

    try {
      const response = await this.signInEmail.run(data);

      if (response.errorCode)
        this.updateLoadingState(false, 'Correo o contresena erroneos', 'user');
      else this.updateLoadingState(false, null, 'user');

      runInAction(() => {
        this.isUserResponse = response;
        rootStore.authStore.setUser(response);
      });
    } catch (error) {
      console.log('LoginViewModel.signInWithEmailAndPassword.error:', error);
      this.updateLoadingState(false, 'Algo ha salido mal.', 'user');
    }
  }

  public async signInWithGoogle(): Promise<void> {
    this.updateLoadingState(true, null, 'user');

    try {
      // const response = await this.signInGoogle.execute();
      // if (response.errorCode) this.updateLoadingState(false, 'Algo ha salido mal.', 'user');
      // else this.updateLoadingState(false, null, 'user');
      // runInAction(() => {
      //   this.isUserResponse = response;
      //   // rootStore.authStore.setUser(response);
      // });
    } catch (error) {
      console.log('LoginViewModel.signInWithEmailAndPassword.error:', error);
      this.updateLoadingState(false, 'Algo ha salido mal.', 'user');
    }
  }

  /**
   * Handlers erros
   */
  private updateLoadingState(isLoading: boolean, error: string | null, type: ICalls) {
    runInAction(() => {
      switch (type) {
        case 'user':
          this.isUserLoading = isLoading;
          this.isUserError = error;
          break;
      }
    });
  }
}
