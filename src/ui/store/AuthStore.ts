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

  constructor() {
    makeAutoObservable(this);
    this.sessionRepositoryImpl = new SessionRepositoryImpl(this.datasource);
    this.checkSession = new CheckActiveSession(this.sessionRepositoryImpl);
  }

  setUser(user: User | null) {
    this.user = user;
  }

  async checkActiveSession() {
    const user = await this.checkSession.execute();
    if (user) {
      this.setUser(user);
    } else {
      this.setUser(null);
    }
  }
}
