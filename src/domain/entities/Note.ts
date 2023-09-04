import { NoteModel, timeStamp } from "@/data/models/NoteModel";

export interface NoteProps extends NoteModel {}

class Note {
  public uuid: string; // NoteId
  public title: string;
  public content: string;
  public userId: string;
  public color: string;
  public pin: boolean;
  public isSyncing: boolean;
  public lastSynced: Date | null;
  public syncError: string | null;
  public tags: Array<string | number>;
  public updatedAt: timeStamp;
  public createdAt: timeStamp;

  constructor(model: NoteModel) {
    this.uuid = model.uuid;
    this.title = model.title;
    this.content = model.content;
    this.userId = model.userId;
    this.color = model.color;
    this.pin = model.pin;
    this.tags = model.tags;
    this.updatedAt = model.updatedAt;
    this.createdAt = model.createdAt;
    this.isSyncing = model.isSyncing || false;
    this.lastSynced = model.lastSynced || null;
    this.syncError = model.syncError || null;
  }
}

export default Note;
