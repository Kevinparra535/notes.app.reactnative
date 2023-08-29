import { useState, useEffect, useMemo } from "react";
import { makeAutoObservable, runInAction } from "mobx";
import Toast from "react-native-root-toast";

import Note from "@/domain/entities/Note";

import { DeleteNote } from "@/domain/useCases/deleteNote";
import { GetNoteById } from "@/domain/useCases/getNoteById";
import { UpdateNoteContent } from "@/domain/useCases/updateNoteContent";

import { NoteRepositoryImpl } from "@/data/repositories/NoteRepositoryImpl";
import { NetworkNoteDatasource } from "@/data/network/NetworkNoteDatasource";

import { debounce } from "@/ui/utils/Deboucing";
import notesStore from "@/ui/store/NotesStore";

export class NotesDetailsViewModel {
  public note: Note | null = null;
  private deleteNote: DeleteNote;
  private getNoteById: GetNoteById;
  private updateNoteContent: UpdateNoteContent;
  private noteRepositoryImpl: NoteRepositoryImpl;
  private datasource: NetworkNoteDatasource =
    NetworkNoteDatasource.getInstance();

  private noteId: string;
  public error: unknown = null;
  public isLoading: boolean = true;
  public isSyncing: boolean = false;
  public syncError: string | null = null;
  public lastSynced: { seconds: number; nanoseconds: number } | null = null;

  private toastMessage: any;
  public noteUpdated: boolean = false;

  constructor(noteId: string) {
    makeAutoObservable(this);
    this.noteId = noteId;
    this.noteRepositoryImpl = new NoteRepositoryImpl(this.datasource);
    this.getNoteById = new GetNoteById(this.noteRepositoryImpl);
    this.updateNoteContent = new UpdateNoteContent(this.noteRepositoryImpl);
    this.deleteNote = new DeleteNote(this.noteRepositoryImpl);

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

  private setToastMessage(message: string) {
    this.toastMessage = Toast.show(message, {
      duration: Toast.durations.LONG,
    });
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

  private setError(error: unknown) {
    this.error = error;
  }

  async fetchNote(): Promise<void> {
    try {
      const response: Note = await this.getNoteById.execute(this.noteId);
      this.setNote(response);
      this.setLoading(false);
    } catch (error: unknown) {
      this.setError(error);
      console.log("NotesDetailsViewModel.fetchNotes.error ==> ", error);
    } finally {
      this.setLoading(false);
    }
  }

  handleNoteChange(newData: Record<string, any>) {
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

  setFavouritesNote(newData: Record<string, boolean>) {
    const fun = debounce(async (newData: Record<string, any>) => {
      try {
        await this.updateNoteContent.execute(this.noteId, newData);

        this.setToastMessage(
          `Note ${newData.pin ? "added to" : "removed of"}  favourites`
        );

        runInAction(() => {
          this.fetchNote();
          notesStore.setNoteUpdated(true);
        });
      } catch (error) {
        console.log("NotesViewModel.setFavouritesNote.error:", error);
        this.setToastMessage(`Error when adding a note.`);
      }
    }, 500);

    fun(newData);
  }

  async setNewColorNote(newData: Record<string, string>) {

    console.log(newData)

    try {
      await this.updateNoteContent.execute(this.noteId, newData);

      runInAction(() => {
        this.fetchNote();
        notesStore.setNoteUpdated(true);
      });
    } catch (error) {
      console.log("NotesViewModel.setFavouritesNote.error:", error);
    }
  }

  async deleteNotes(): Promise<boolean> {
    try {
      await this.deleteNote.execute(this.noteId);
      this.setToastMessage(`Note successfully deleted!`);

      runInAction(() => {
        notesStore.setNoteUpdated(true);
      });
      return true;
    } catch (error) {
      console.log("NotesDetailsViewModel.deleteNotes.error:", error);
      this.setToastMessage(`Error deleting a note.`);
      return false;
    }
  }
}
