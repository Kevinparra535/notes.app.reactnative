/**
 * Siguiendo el principio de inversión de dependencias, el repositorio se define en la capa de dominio, pero su implementación se hará en la capa de datos. Este enfoque permite que la lógica de negocio (capa de dominio) sea completamente agnóstica de la lógica de acceso a datos.
 *
 * El repositorio NoteRepository debe definir todos los métodos necesarios para interactuar con las notas desde el punto de vista del almacenamiento.
 */

import { ResponseModel } from "@/data/models/ResponseModel";
import Note from "@/domain/entities/Note";

export interface NoteRepository {
  lastSynced?: Date;
  isSyncing?: boolean;
  syncError?: boolean;
  getNoteById(uuid: string): Promise<Note>;
  deleteNote(uuid: string): Promise<void>;
  getAllNotes(): Promise<ResponseModel<Array<Note>>>;
  getFavoritesNotes(): Promise<ResponseModel<Array<Note>>>;
  createNote(data: Record<string, string>): Promise<string>;
  updateContent(noteId: string, newData: Record<string, string>): Promise<void>;
}
