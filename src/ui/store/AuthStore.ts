import { observable, makeAutoObservable } from "mobx";
import User from "@/domain/entities/User";

export class AuthStore {
  @observable user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User | null) {
    this.user = user;
  }
}
