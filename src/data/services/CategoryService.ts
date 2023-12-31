import {
  db,
  doc,
  auth,
  query,
  where,
  addDoc,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  writeBatch,
  onSnapshot,
  arrayRemove,
  serverTimestamp,
} from "@/config/firebaseConfig";

import Category from "@/domain/entities/Category";
import { ResponseModel } from "../models/ResponseModel";

export class CategoryService {
  private collectionName: string = "categories";
  private collectionNotesName: string = "notes";

  async delete(id: string): Promise<void> {
    const ref = doc(db, this.collectionName, id);

    // Elimina la categoría
    await deleteDoc(ref);

    // Llama a la función para eliminar la categoría de las notas relacionadas
    await this.removeCategoryFromNotes(id);
  }

  async getById(noteId: string): Promise<Category> {
    return new Promise((resolve, reject) => {
      const unsub = onSnapshot(
        doc(db, this.collectionName, noteId),
        (docSnap) => {
          if (docSnap.exists()) {
            const data: Category = docSnap.data() as Category;
            resolve(data);

            unsub();
          } else {
            reject(new Error("Category not found"));

            unsub();
          }
        }
      );
    });
  }

  async fetchAll(): Promise<ResponseModel<Array<Category>>> {
    const user = auth.currentUser;

    return new Promise((resolve, reject) => {
      const formatedResponse: Array<Category> = [];
      const categoryCol = collection(db, this.collectionName);
      const q = query(
        categoryCol,
        where("userId", "==", user?.uid),
        orderBy("updatedAt", "desc")
      );

      const unsub = onSnapshot(
        q,
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added" || change.type === "modified") {
              const docData: any = {
                uuid: change.doc.id,
                ...change.doc.data(),
              };
              formatedResponse.push(docData);
            }
            if (change.type === "removed") {
              const indexToRemove = formatedResponse.findIndex(
                (item) => item.uuid === change.doc.id
              );
              if (indexToRemove !== -1) {
                formatedResponse.splice(indexToRemove, 1);
              }
            }
          });
          resolve({ status: "success", data: formatedResponse });
        },
        (error) => {
          reject({ status: "error", error: error.message });
        }
      );

      return unsub;
    });
  }

  async create(data: Record<string, string>): Promise<string> {
    const user = auth.currentUser;

    const docRef = await addDoc(collection(db, this.collectionName), {
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      userId: user?.uid,
      ...data,
    });

    return docRef.id;
  }

  async update(categoryId: string, data: Record<string, any>): Promise<void> {
    const user = auth.currentUser;

    const catgoryRef = doc(db, this.collectionName, categoryId);
    const updatedData = {
      ...data,
      userId: user?.uid,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(catgoryRef, updatedData);
  }

  async addTagsToNotes(noteId: string, tags: Array<string>): Promise<void> {
    const noteRef = doc(db, this.collectionNotesName, noteId);
    const updatedData = {
      tags: tags,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(noteRef, updatedData);
  }

  async removeCategoryFromNotes(categoryId: string): Promise<void> {
    const q = query(
      collection(db, this.collectionNotesName),
      where("tags", "array-contains", categoryId)
    );

    const notesSnapshot = await getDocs(q);

    const batch = writeBatch(db);

    notesSnapshot.forEach((noteDoc) => {
      const noteRef = doc(db, this.collectionNotesName, noteDoc.id);
      batch.update(noteRef, {
        tags: arrayRemove(categoryId), // Usamos `arrayRemove` para quitar la categoría de la matriz de etiquetas
      });
    });

    await batch.commit();
  }
}
