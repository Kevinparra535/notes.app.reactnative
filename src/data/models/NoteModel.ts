

export interface NoteModel {
  uuid: string;
  id: string;
  title: string;
  content: string;
  isSyncing?: boolean;
  lastSynced?: Date;
  syncError?: string;
}
