

export interface NoteModel {
  id: string;
  uuid: string,
  title: string;
  content: string;
  updated: {
  seconds: number;
  nanoseconds: number;
},
  isSyncing?: boolean;
  lastSynced?: Date;
  syncError?: string;
}
