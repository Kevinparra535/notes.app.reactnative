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
  uuid: string;
  title: string;
  content: string;
}

class Note {
  public id: string;
  public uuid: string;
  public title: string;
  public content: string;

  constructor(model: NoteModel) {
    this.id = model.id;
    this.uuid = model.uuid;
    this.title = model.title;
    this.content = model.content;
  }

  // Actualizacion de contenido
  updateContent(newContent: string): void {
    console.log("Update Content");

    // this.content = newContent;
    // this.updateDate();
  }

  updateTitle(newTitle: string): void {
    console.log("Update Title");

    // this.title = newTitle;
    // this.updateDate();
  }
}

export default Note;
