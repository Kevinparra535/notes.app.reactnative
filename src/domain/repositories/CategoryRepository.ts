import { ResponseModel } from "@/data/models/ResponseModel";
import Category from "../entities/Category";

export interface CategoryRepository {
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Category>;
  getAll(): Promise<ResponseModel<Array<Category>>>;
  create(data: Record<string, string>): Promise<string>;
  update(id: string, newData: Record<string, string>): Promise<void>;
  addTagsToNotes(noteId: string, tags: Array<string>): Promise<void>;
}
