import { makeAutoObservable, runInAction } from "mobx";

import { SignUpWithEmailAndPassword } from "@/domain/useCases/signUpUser";

import { NetworkSessionDatasource } from "@/data/network/NetworkSessionDatasource";
import { SessionRepositoryImpl } from "@/data/repositories/SessionRepositoryImpl";
import rootStore from "@/ui/store/RootStore";
import User from "@/domain/entities/User";

export class SignUpViewModel {
  private signUpEmail: SignUpWithEmailAndPassword;
  private sessionRepositoryImpl: SessionRepositoryImpl;
  private datasource: NetworkSessionDatasource =
    NetworkSessionDatasource.getInstance();

  public user: User | null = null;
  public isLoading: boolean = false;
  public syncError: string | null = null;
  public error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.sessionRepositoryImpl = new SessionRepositoryImpl(this.datasource);
    this.signUpEmail = new SignUpWithEmailAndPassword(
      this.sessionRepositoryImpl
    );
  }

  private setSyncing() {
    this.isLoading = true;
    this.syncError = null;
  }

  private setSynced() {
    this.isLoading = false;
  }

  private setSyncError(error: string) {
    this.isLoading = false;
    this.syncError = error;
  }

  async signUpWithEmailAndPassword(
    data: Record<string, string>
  ): Promise<void> {
    this.setSyncing();

    try {
      const response = await this.signUpEmail.execute(data);
      this.setSynced();

      if (response.errorCode)
        this.setSyncError("El email ya se encuentra registrado");

      if (response.uid)
        runInAction(() => {
          this.user = response;
          rootStore.authStore.setUser(response);
        });
    } catch (error) {
      console.log("SignUpViewModel.signUpWithEmailAndPassword.error:", error);
      this.setSyncError("Algo ha salido mal.");
    }
  }
}
