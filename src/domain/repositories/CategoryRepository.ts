import { ResponseModel } from "@/data/models/ResponseModel";
import Category from "../entities/Category";

export interface CategoryRepository {
  getAll(): Promise<ResponseModel<Array<Category>>>
  create(data: Record<string, string>): Promise<string>;
}