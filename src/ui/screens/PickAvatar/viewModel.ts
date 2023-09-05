import { makeAutoObservable, runInAction } from "mobx";

import User from "@/domain/entities/User";
import { UpdateUser } from "@/domain/useCases/updateUser";
import { NetworkUserDatasource } from "@/data/network/NetworkUserDatasource";
import { UserRepositoryImpl } from "@/data/repositories/UserRepositoryImpl";
import rootStore from "@/ui/store/RootStore";

export class PickAvatarViewModel {
  private updateUser: UpdateUser;
  private userRepositoryImpl: UserRepositoryImpl;
  private datasource: NetworkUserDatasource =
    NetworkUserDatasource.getInstance();

  public user: User | null = null;
  public isLoading: boolean = false;
  public syncError: string | null = null;
  public error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.userRepositoryImpl = new UserRepositoryImpl(this.datasource);
    this.updateUser = new UpdateUser(this.userRepositoryImpl);
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

  async setNewAvatar(avatar: string) {
    this.setSyncing();

    try {
      const response = await this.updateUser.execute({ photoURL: avatar });
      this.setSynced();

      runInAction(() => {
        this.user = response;
        rootStore.authStore.setUser(response);
      });
    } catch (error) {
      console.log("PickAvatarViewModel.setNewAvatar.error:", error);
      this.setSyncError("Algo ha salido mal.");
    }

    console.log("Avatar selected:", avatar);
  }
}
