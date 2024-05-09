import {
  db,
  collection,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  auth,
} from '@/config/firebaseConfig';

import Note from '@/domain/entities/Note';
import { ResponseModel } from '../models/ResponseModel';
import { NotesCacheManager } from '@/ui/store/NotesCacheManager';
import { CategoryService } from './CategoryService';
import { injectable } from 'inversify';

@injectable()
export class NotesService {
  private cacheManager = new NotesCacheManager();
  private collectionName: string = 'notes';
  private categoryService = new CategoryService();

  /**
   * Fetches all notes for the current user.
   * @returns A Promise that resolves to a ResponseModel containing an array of Note objects.
   */
  async fetchAllNotes(): Promise<ResponseModel<Array<Note>>> {
    return this.fetchNotes((user) => {
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', user?.uid),
        orderBy('updatedAt', 'desc')
      );
      return q;
    });
  }

  /**
   * Fetches all favorite notes for the current user.
   * @returns A Promise that resolves to a ResponseModel containing an array of Note objects.
   */
  async fetchFavoritesNotes(): Promise<ResponseModel<Array<Note>>> {
    return this.fetchNotes((user) => {
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', user?.uid),
        where('pin', '==', true),
        orderBy('updatedAt', 'desc')
      );
      return q;
    });
  }

  /**
   * Fetches notes based on the provided query builder function.
   * @param queryBuilder - A function that takes the current user as a parameter and returns a Firestore query.
   * @returns A Promise that resolves to a ResponseModel containing an array of Note objects.
   */
  private async fetchNotes(queryBuilder: (user: any) => any): Promise<ResponseModel<Array<Note>>> {
    const user = auth.currentUser;

    return new Promise((resolve, reject) => {
      const formatedResponse: Array<Note> = [];
      const q = queryBuilder(user);

      const handleSnapshot = async (snapshot: any) => {
        const promises = snapshot.docChanges().map(async (change: any) => {
          try {
            if (change.type === 'added' || change.type === 'modified') {
              const docData: Note = {
                ...change.doc.data(),
                tags: await this.getCategoriesForNotes(change.doc.data().tags),
                uuid: change.doc.id,
              };
              formatedResponse.push(docData);
            } else if (change.type === 'removed') {
              const indexToRemove: number = formatedResponse.findIndex(
                (item) => item.uuid === change.doc.id
              );
              if (indexToRemove !== -1) {
                formatedResponse.splice(indexToRemove, 1);
              }
            }
          } catch (error) {
            console.log('ERROR EN EL SERVICIO: FETCH ALL NOTES');
          }
        });

        // Wait for all promises to complete before resolving
        await Promise.all(promises);

        resolve({ status: 'success', data: formatedResponse });
      };

      const unsub = onSnapshot(q, handleSnapshot, (error) => {
        reject({ status: 'error', error: error.message });
      });

      return unsub;
    });
  }

  /**
   * Creates a new note with the provided data.
   * @param data - The data for the new note.
   * @returns A Promise that resolves to the ID of the newly created note.
   */
  async createNote(data: Record<string, string>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collectionName), {
      tags: [],
      pin: false,
      color: '#FFFFFF',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...data,
    });

    return docRef.id;
  }

  /**
   * Fetches a note by its ID.
   * @param noteId - The ID of the note to fetch.
   * @returns A Promise that resolves to the fetched Note object.
   */
  async fetchNoteById(noteId: string): Promise<Note> {
    return new Promise((resolve, reject) => {
      const unsub = onSnapshot(doc(db, this.collectionName, noteId), (docSnap) => {
        if (docSnap.exists()) {
          const noteData: Note = docSnap.data() as Note;
          resolve(noteData);
          unsub();
        } else {
          reject(new Error('Note not found'));
          unsub();
        }
      });
    });
  }

  /**
   * Updates the content of a note.
   * @param noteId - The ID of the note to update.
   * @param data - The updated data for the note.
   * @returns A Promise that resolves when the note is successfully updated.
   */
  async updateNoteContent(noteId: string, data: Record<string, any>): Promise<void> {
    const notesRef = doc(db, this.collectionName, noteId);
    const updatedData = {
      ...data,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(notesRef, updatedData);
    this.cacheManager.clear(noteId);
  }

  /**
   * Deletes a note.
   * @param noteId - The ID of the note to delete.
   * @returns A Promise that resolves when the note is successfully deleted.
   */
  async deleteNote(noteId: string): Promise<void> {
    const notesRef = doc(db, this.collectionName, noteId);
    await deleteDoc(notesRef);
    this.cacheManager.clear(noteId);
  }

  /**
   * Retrieves categories for the given category IDs.
   * @param categoryIds - An array of category IDs.
   * @returns A Promise that resolves to an array of category objects.
   */
  async getCategoriesForNotes(categoryIds: Array<string>): Promise<Array<any>> {
    return Promise.all(
      categoryIds.map(async (categoryId) => {
        try {
          const response = await this.categoryService.getById(categoryId);
          return { ...response, uuid: categoryId };
        } catch (error: any) {
          console.error(`Error retrieving category with ID ${categoryId}: ${error.message}`);
          return null;
        }
      })
    );
  }
}
