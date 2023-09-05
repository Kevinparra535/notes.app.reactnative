import { SessionModel } from "@/data/models/SessionModel";

class User {
  public uid?: string | null;
  public email?: string | null;
  public displayName?: string | null;
  public photoURL?: string | null;

  constructor(model: SessionModel) {
    this.uid = model.uid;
    this.email = model.email;
    this.photoURL = model.photoURL;
    this.displayName = model.displayName;
  }
}

export default User;
