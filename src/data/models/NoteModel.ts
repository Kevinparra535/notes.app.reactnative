export type timeStamp = { seconds: number; nanoseconds: number };

export interface NoteModel {
  uuid: string; // NoteId
  title: string;
  content: string;
  userId: string;
  color: string;
  pin: boolean;
  isSyncing?: boolean;
  lastSynced?: Date;
  syncError?: string;
  tags: Array<string | number>;
  updatedAt: timeStamp;
  createdAt: timeStamp;
}
