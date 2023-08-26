import { useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { GetAllNotes } from "@/domain/useCases/getAllNotes";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";
import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";
import { NoteModel } from "@/data/models/NoteModel";
import { ResponseModel } from "@/data/models/ResponseModel";
import { makeAutoObservable } from "mobx";

export class NotesViewModel {
  private datasource = NetworkNoteDatasource.getInstance();
  private getAllNotes: GetAllNotes;

  public notes: ResponseModel<Array<NoteModel>> = {
    status: "loading",
  };

  constructor() {
    makeAutoObservable(this);
    this.getAllNotes = new GetAllNotes(new NoteRepositoryImpl(this.datasource));
    this.fetchNote();
  }

  private setNotes(notes: ResponseModel<Array<NoteModel>>) {
    this.notes = notes;
  }

  private async fetchNote(): Promise<void> {
    const result: ResponseModel<Array<NoteModel>> =
      await this.getAllNotes.execute();

    this.setNotes(result);
  }

  public refresh(): void {
    ToastAndroid.show('Synchronising notes!', ToastAndroid.SHORT);
    this.fetchNote();
  }
}
