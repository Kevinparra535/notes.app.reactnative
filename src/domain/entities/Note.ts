/**
 * La nota se compone de dos valores principales
 * noteId: string;
 * title: string;
 * content: string;
 * userId: string;
 *
 * Ajustes/features complementarios
 * creationDate: Date;
 * color: string;
 * pin: boolean;
 * tags: Array<string | number>
 * updatedDate: Date;
 *
 * ____________Methodos a futuro
 *
 * Manejo del color
 * setColor(newColor: string): void {this.color = newColor;}
 *
 * Fijar nota (Pin)
 * togglePin(): void { this.pin = !this.pin; }
 *
 *
 * Gestion de etiquetas
 * addTag(tag: string | number): void {  if (!this.tags.includes(tag)) { this.tags.push(tag); } }
 * removeTag(tag: string | number): void { const index = this.tags.indexOf(tag); if (index !== -1) { this.tags.splice(index, 1); }}
 */

import { NoteModel } from "@/data/models/NoteModel";

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  updated: {
  seconds: number;
  nanoseconds: number;
};
  isSyncing?: boolean;
  lastSynced?: Date;
  syncError?: string;
}

class Note {
  public id: string;
  public title: string;
  public content: string;
  public updated: {
  seconds: number;
  nanoseconds: number;
};
  public isSyncing: boolean;
  public lastSynced: Date | null;
  public syncError: string | null;

  constructor(model: NoteModel) {
    this.id = model.id;
    this.title = model.title;
    this.content = model.content;
    this.updated = model.updated;
    this.isSyncing = model.isSyncing || false;
    this.lastSynced = model.lastSynced || null;
    this.syncError = model.syncError || null;
  }
}

export default Note;
