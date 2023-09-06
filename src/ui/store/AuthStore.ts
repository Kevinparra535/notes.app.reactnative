import { observable, makeAutoObservable } from "mobx";
import User from "@/domain/entities/User";
import { CheckActiveSession } from "@/domain/useCases/checkActiveSession";
import { SessionRepositoryImpl } from "@/data/repositories/SessionRepositoryImpl";
import { NetworkSessionDatasource } from "@/data/network/NetworkSessionDatasource";

export class AuthStore {
  @observable user: User | null = null;

  private checkSession: CheckActiveSession;
  private sessionRepositoryImpl: SessionRepositoryImpl;
  private datasource: NetworkSessionDatasource =
    NetworkSessionDatasource.getInstance();

  public isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.sessionRepositoryImpl = new SessionRepositoryImpl(this.datasource);
    this.checkSession = new CheckActiveSession(this.sessionRepositoryImpl);
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
      const user = await this.checkSession.execute();

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
      console.log("AuthStore.checkActiveSession: ", error);
    }
  }
}

const authStore = new AuthStore();
export default authStore;
