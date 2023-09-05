import { AuthStore } from "./AuthStore";

export class RootStore {
  authStore = new AuthStore();
}

const rootStore = new RootStore();
export default rootStore;
