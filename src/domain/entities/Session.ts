import { SessionModel } from "@/data/models/SessionModel";

class Session {
  public uid?: string | null;
  public email?: string | null;
  public errorCode?: string;

  constructor(model: SessionModel) {
    this.uid = model.uid;
    this.email = model.email;
  }
}

export default Session;
