import Category from "@/domain/entities/Category";

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
  tags?: Array<Category>;
  updatedAt: timeStamp;
  createdAt: timeStamp;
}
