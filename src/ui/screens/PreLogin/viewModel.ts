import { NetworkSessionDatasource } from "@/data/network/NetworkSessionDatasource";
import { SessionRepositoryImpl } from "@/data/repositories/SessionRepositoryImpl";
import {
  SignInWithGoogle,
  SignInWithEmailAndPassword,
} from "@/domain/useCases/signInUser";
import { User } from "firebase/auth";
import { makeAutoObservable } from "mobx";

export class PreLoginViewModel {
  private signInGoogle: SignInWithGoogle;
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

  async signInWithGoogle(): Promise<void> {
    // this.setSyncing();

    try {
      const response = await this.signInGoogle.execute();
      // this.setSynced();

      console.log(response);

      if (response.errorCode) {
        this.setSyncError("Correo o contresena erroneos");
      }

      // runInAction(() => {
      //   this.user = response;
      //   rootStore.authStore.setUser(response);
      // });
    } catch (error) {
      console.log("PreLoginViewModel.signInWithGoogle.error:", error);
      this.setSyncError("Algo ha salido mal.");
    }
  }
}
