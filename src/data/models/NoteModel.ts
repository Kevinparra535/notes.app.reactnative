

export interface NoteModel {
  id: string;
  title: string;
  content: string;
  isSyncing?: boolean;
  lastSynced?: Date;
  syncError?: string;
}
