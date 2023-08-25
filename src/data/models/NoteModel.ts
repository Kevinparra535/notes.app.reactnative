

export interface NoteModel {
  id: string;
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
