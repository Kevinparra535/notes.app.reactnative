import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";
import { SessionRepositoryImpl } from "@/data/repositories/SessionRepositoryImpl";
import { SignInWithEmailAndPassword } from "@/domain/useCases/signInUser";
import { makeAutoObservable } from "mobx";

export class LoginViewModel {
  private signInEmail: SignInWithEmailAndPassword;
  private sessionRepositoryImpl: SessionRepositoryImpl;
  private datasource: NetworkNoteDatasource =
    NetworkNoteDatasource.getInstance();

  public isLoading: boolean = false;
  public syncError: string | null = null;
  public error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.sessionRepositoryImpl = new SessionRepositoryImpl(this.datasource);
    this.signInEmail = new SignInWithEmailAndPassword(
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
    } catch (error) {
      console.log("LoginViewModel.signInWithEmailAndPassword.error:", error);
      this.setSyncError("Algo ha salido mal.");
    }
  }
}
