import { useState, useEffect, useMemo } from "react";
import Note from "@/domain/entities/Note";
import { GetNoteById } from "@/domain/useCases/getNoteById";
import { UpdateNoteContent } from "@/domain/useCases/updateNoteContent";
import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";
import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";
import { debounce } from "@/ui/utils/Deboucing";
import { makeAutoObservable, runInAction } from "mobx";
import notesStore from "@/ui/store/NotesStore";

export class NotesDetailsViewModel {
  public note: Note | null = null;
  private getNoteById: GetNoteById;
  private updateNoteContent: UpdateNoteContent;
  private noteRepositoryImpl: NoteRepositoryImpl;
  private datasource: NetworkNoteDatasource = NetworkNoteDatasource.getInstance();

  private noteId: string;
  public isLoading: boolean = true;
  public isSyncing: boolean = false;
  public syncError: string | null = null;
  public error: string | null | unknown = null;
  public lastSynced: { seconds: number; nanoseconds: number } | null = null;

  public noteUpdated: boolean = false;

  constructor(noteId: string) {
    makeAutoObservable(this);
    this.noteId = noteId;
    this.noteRepositoryImpl = new NoteRepositoryImpl(this.datasource);
    this.getNoteById = new GetNoteById(this.noteRepositoryImpl);
    this.updateNoteContent = new UpdateNoteContent(this.noteRepositoryImpl);

    this.fetchNote();
  }

  private setSyncing() {
    this.isSyncing = true;
    this.syncError = null;
  }

  private setSynced() {
    const now = new Date().getTime();
    const totalSeconds = now / 1000;
    const seconds = Math.floor(totalSeconds);
    const nanoseconds = Math.floor((totalSeconds - seconds) * 1e9);

    this.isSyncing = false;
    this.lastSynced = { seconds, nanoseconds };
  }

  private setSyncError(error: string) {
    this.isSyncing = false;
    this.syncError = error;
  }

  private setLoading(state: boolean) {
    this.isLoading = state;
  }

  private setNote(note: Note) {
    this.note = note;
  }

  private setError(error: string | unknown) {
    this.error = error;
  }

  async fetchNote(): Promise<void> {
    try {
      const response: Note = await this.getNoteById.execute(this.noteId);
      this.setNote(response);
      this.setLoading(false);
    } catch (error) {
      console.log("NotesDetailsViewModel.fetchNotes.error ==> ", error);
      this.setError(error);
    } finally {
      this.setLoading(false);
    }
  }

  handleNoteChange(newData: Record<string, string>) {
    this.setSyncing();

    if (!this.note) return;

    const fun = debounce(async (newData: Record<string, string>) => {
      try {
        await this.updateNoteContent.execute(this.noteId, newData);
        this.setSynced();

        runInAction(() => {
          this.noteUpdated = true;
          notesStore.setNoteUpdated(true);
        });
      } catch (error) {
        console.log("NotesDetailsViewModel.handleNoteChange.error:", error);
        this.setSyncError("Failed to fetch note.");
      }
    }, 1000);

    fun(newData);
  }
}
