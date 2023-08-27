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

import { NoteModel, timeStamp } from "@/data/models/NoteModel";

export interface NoteProps extends NoteModel {}

class Note {
  public uuid: string; // NoteId
  public title: string;
  public content: string;
  public userId: string;
  public color: string;
  public pin: boolean;
  public isSyncing: boolean;
  public lastSynced: Date | null;
  public syncError: string | null;
  public tags: Array<string | number>;
  public updatedAt: timeStamp;
  public createdAt: timeStamp;

  constructor(model: NoteModel) {
    this.uuid = model.uuid;
    this.title = model.title;
    this.content = model.content;
    this.userId = model.userId;
    this.color = model.color;
    this.pin = model.pin;
    this.tags = model.tags;
    this.updatedAt = model.updatedAt;
    this.createdAt = model.createdAt;
    this.isSyncing = model.isSyncing || false;
    this.lastSynced = model.lastSynced || null;
    this.syncError = model.syncError || null;
  }
}

export default Note;
