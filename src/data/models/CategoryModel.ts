export type timeStamp = { seconds: number; nanoseconds: number };

export interface CategoryModel {
  uuid: string;
  title: string;
  userId: string;
  color: string;
  notesId: Array<string>;
  updatedAt: timeStamp;
  createdAt: timeStamp;
}
