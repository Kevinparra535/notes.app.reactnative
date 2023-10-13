import Category from "@/domain/entities/Category";

export type timeStamp = { seconds: number; nanoseconds: number };

export interface NoteModel {
  pin: boolean;
  uuid: string;
  title: string;
  color: string;
  userId: string;
  content: string;
  lastSynced?: Date;
  syncError?: string;
  isSyncing?: boolean;
  updatedAt: timeStamp;
  createdAt: timeStamp;
  tags: Array<Category>;
}
