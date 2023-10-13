export type timeStamp = { seconds: number; nanoseconds: number };

export interface CategoryModel {
  uuid: string;
  title: string;
  color: string;
  userId: string;
  updatedAt: timeStamp;
  createdAt: timeStamp;
}
