import { NetworkSessionDatasource } from "@/data/network/NetworkSessionDatasource";
import { SessionRepositoryImpl } from "@/data/repositories/SessionRepositoryImpl";
import User from "@/domain/entities/User";
import {
  SignInWithEmailAndPassword,
  SignInWithGoogle,
} from "@/domain/useCases/signInUser";
import rootStore from "@/ui/store/RootStore";
import { makeAutoObservable, runInAction } from "mobx";

export class LoginViewModel {
  private signInGoogle: SignInWithGoogle;
  private signInEmail: SignInWithEmailAndPassword;
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
    this.signInEmail = new SignInWithEmailAndPassword(
      this.sessionRepositoryImpl
    );

    this.signInGoogle = new SignInWithGoogle(this.sessionRepositoryImpl);
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

  async signInWithEmailAndPassword(
    data: Record<string, string>
  ): Promise<void> {
    this.setSyncing();

    try {
      const response = await this.signInEmail.execute(data);
      this.setSynced();

      if (response.errorCode) {
        this.setSyncError("Correo o contresena erroneos");
      }

      runInAction(() => {
        this.user = response;
        rootStore.authStore.setUser(response);
      });
    } catch (error) {
      console.log("LoginViewModel.signInWithEmailAndPassword.error:", error);
      this.setSyncError("Algo ha salido mal.");
    }
  }

  async signInWithGoogle(): Promise<void> {
    // this.setSyncing();

    try {
      const response = await this.signInGoogle.execute();
      // this.setSynced();

      if (response.errorCode) {
        this.setSyncError("Correo o contresena erroneos");
      }

      // runInAction(() => {
      //   this.user = response;
      //   rootStore.authStore.setUser(response);
      // });
    } catch (error) {
      console.log("LoginViewModel.signInWithEmailAndPassword.error:", error);
      this.setSyncError("Algo ha salido mal.");
    }
  }
}
