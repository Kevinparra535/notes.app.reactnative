import { action, makeAutoObservable, observable } from "mobx";

import { ResponseModel } from "@/data/models/ResponseModel";

export class CategoriesViewModel {
  public showCreateCatInput: boolean = false;
  public categoryIdToEdit: string | null = null;
  public categories: ResponseModel<Array<any>> = {
    status: "success",
    data: [
      {
        title: "University",
        color: "#F8C5C3",
        uuid: "7YF7YfV8m3TyOa9fGo50",
        notesId: ["QSHNAB5lTksdqEiKvsgy"],
        userId: "8Fep2CK58qaNHIR1QucQ7TLFhmD3",
      },

      {
        title: "Shopping",
        color: "#B6D3E0",
        uuid: "7YF7YfV8m3TyOa9fGo51",
        notesId: ["QSHNAB5lTksdqEiKvsgy"],
        userId: "8Fep2CK58qaNHIR1QucQ7TLFhmD3",
      },
    ],
  };

  constructor() {
    makeAutoObservable(this, {
      setShowCatInput: action,
      setCategoryId: action,
    });

    this.fetchData();
  }

  public setShowCatInput(status: boolean) {
    this.showCreateCatInput = status;
  }

  public setCategoryId(id: string | null) {
    this.categoryIdToEdit = id;
  }

  private setData(data: ResponseModel<Array<any>>) {
    this.categories = data;
  }

  private async fetchData() {}

  public refresh(): void {
    this.fetchData();
  }
}
