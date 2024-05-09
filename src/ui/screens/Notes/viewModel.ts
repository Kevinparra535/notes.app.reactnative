import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { TranslateHelper } from '@/ui/i18n';
import Toast from 'react-native-root-toast';

import { DeleteNoteUseCase } from '@/domain/useCases/deleteNote';
import { GetAllNotesUseCase } from '@/domain/useCases/getAllNotes';
import { UpdateNoteContentUseCase } from '@/domain/useCases/updateNoteContent';

import { NoteModel } from '@/data/models/NoteModel';
import { ResponseModel } from '@/data/models/ResponseModel';

import notesStore from '@/ui/store/NotesStore';
import categoryStore from '@/ui/store/CategoryStore';

import { debounce } from '@/ui/utils/Deboucing';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/config/types';

@injectable()
export class NotesViewModel {
  private toastMessage: any;

  public notes: ResponseModel<Array<NoteModel>> = {
    status: 'loading',
  };

  constructor(
    @inject(TYPES.DeleteNoteUseCase) private deleteNote: DeleteNoteUseCase,
    @inject(TYPES.GetAllNotesUseCase) private getNotes: GetAllNotesUseCase,
    @inject(TYPES.UpdateNoteContentUseCase) private updateNoteContent: UpdateNoteContentUseCase
  ) {
    makeAutoObservable(this);

    this.fetchNote();

    reaction(
      () => notesStore.newNoteCreated,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setNewNoteCreated(false);
        }
      }
    );

    reaction(
      () => notesStore.noteUpdated,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setNoteUpdated(false);
        }
      }
    );

    reaction(
      () => notesStore.noteAddedFavorite,
      (newVal) => {
        if (newVal) {
          this.refresh();
        }
      }
    );

    reaction(
      () => categoryStore.categoryUpdated,
      (newVal) => {
        if (newVal) {
          this.refresh();
          categoryStore.setCategoryUpdated(false);
        }
      }
    );
  }

  private setToastMessage(message: string) {
    this.toastMessage = Toast.show(message, {
      duration: Toast.durations.SHORT,
      shadow: true,
      animation: true,
      hideOnPress: true,
    });

    setTimeout(() => {
      Toast.hide(this.toastMessage);
    }, Toast.durations.SHORT);
  }

  private setNotes(notes: ResponseModel<Array<NoteModel>>) {
    this.notes = notes;
  }

  private async fetchNote(): Promise<void> {
    const result: ResponseModel<Array<NoteModel>> = await this.getNotes.run();

    console.log(result);

    this.setNotes(result);
  }

  public refresh(): void {
    this.fetchNote();

    reaction(
      () => notesStore.noteUpdated,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setNoteUpdated(false);
        }
      }
    );

    reaction(
      () => notesStore.noteAddedFavorite,
      (newVal) => {
        if (newVal) {
          this.refresh();
          notesStore.setNoteAddedFavorite(false);
        }
      }
    );
  }

  public setfavoritesNote(noteId: string, newData: Record<string, boolean>) {
    const fun = debounce(async (newData: Record<string, any>) => {
      try {
        await this.updateNoteContent.run({
          noteId,
          newData,
        });

        this.setToastMessage(
          newData.pin === true
            ? TranslateHelper('messages.notes.favorites.success')
            : TranslateHelper('messages.notes.favorites.removed')
        );

        runInAction(() => {
          this.refresh();
          notesStore.setNoteAddedFavorite(true);
        });
      } catch (error) {
        console.log('NotesViewModel.setfavoritesNote.error:', error);
        this.setToastMessage(TranslateHelper('messages.notes.favorites.error'));
      }
    }, 500);

    fun(newData);
  }

  async deleteNotes(noteId: string) {
    try {
      await this.deleteNote.run(noteId);

      this.setToastMessage(TranslateHelper('messages.notes.delete.success'));

      runInAction(() => {
        notesStore.setNoteUpdated(true);
        notesStore.setNoteAddedFavorite(true);
      });
    } catch (error) {
      console.log('NotesViewModel.setfavoritesNote.error:', error);
      this.setToastMessage(TranslateHelper('messages.notes.delete.error'));
    }
  }
}
