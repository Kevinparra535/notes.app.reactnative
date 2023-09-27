import { CategoryModel, timeStamp } from "@/data/models/CategoryModel";

interface CategoryProps extends CategoryModel {}

class Category {
  public uuid: string;
  public title: string;
  public userId: string;
  public color: string;
  public notesId: Array<string>;
  public updatedAt?: timeStamp;
  public createdAt?: timeStamp;

  constructor(model: CategoryModel) {
    this.uuid = model.uuid;
    this.title = model.title;
    this.color = model.color;
    this.userId = model.userId;
    this.notesId = model.notesId;
    this.updatedAt = model.updatedAt;
    this.createdAt = model.createdAt;
  }
}

export default Category;
