// /data/cache/NotesCacheManager.ts

type Cache = {
  [key: string]: any; // La llave puede ser el ID de la nota o algún otro identificador.
};

export class NotesCacheManager {
  private cache: Cache = {};

  set(key: string, data: any): void {
    this.cache[key] = data;
  }

  get(key: string): any {
    return this.cache[key];
  }

  has(key: string): boolean {
    return this.cache[key] !== undefined;
  }

  clear(key: string): void {
    delete this.cache[key];
  }
}
