/**
 * Siguiendo el principio de inversión de dependencias, el repositorio se define en la capa de dominio, pero su implementación se hará en la capa de datos. Este enfoque permite que la lógica de negocio (capa de dominio) sea completamente agnóstica de la lógica de acceso a datos.
 *
 * El repositorio NoteRepository debe definir todos los métodos necesarios para interactuar con las notas desde el punto de vista del almacenamiento.
 */

import { ResponseModel } from "@/data/models/ResponseModel";
import Note from "@/domain/entities/Note";

export interface NoteRepository {
  getAllNotes(): Promise<ResponseModel<Array<Note>>>;
  getNoteById(uuid: string): Promise<any>; // This is only for testing
  // findById(noteId: string): Promise<Note | null>;
  // findAllByUser(userId: string): Promise<Note[]>;
  // create(note: Note): Promise<void>;
  // update(note: Note): Promise<void>;
  // delete(noteId: string): Promise<void>;
  // updateContent(noteId: string, content: string): Promise<void>;
  // updateTitle(noteId: string, title: string): Promise<void>;
}
