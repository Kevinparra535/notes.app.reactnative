import authStore from "./AuthStore";

export class RootStore {
  authStore = authStore;
}

const rootStore = new RootStore();
export default rootStore;
