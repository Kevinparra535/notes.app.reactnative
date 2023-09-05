import {
  db,
  doc,
  ref,
  auth,
  query,
  addDoc,
  orderBy,
  updateDoc,
  deleteDoc,
  collection,
  storageRef,
  onSnapshot,
  updateProfile,
  getDownloadURL,
  serverTimestamp,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@/config/firebaseConfig";

import User from "@/domain/entities/User";
import Note from "@/domain/entities/Note";
import Session from "@/domain/entities/Session";
import { ResponseModel } from "../models/ResponseModel";
import { NotesCacheManager } from "../../ui/store/NotesCacheManager";

type nodeId = string;

export class FirebaseService {
  private cacheManager = new NotesCacheManager();
  private collectionName: string = "notes";

  async checkSession(): Promise<User> {
    try {
      const user = auth.currentUser;

      return {
        uid: user!.uid,
        email: user!.email,
      };
    } catch (error: any) {
      const errorCode = error?.code;
      return errorCode;
    }
  }

  async loginUser(credentials: Record<string, string>): Promise<Session> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const user = userCredential.user;

      return {
        uid: user.uid,
        email: user.email,
      };
    } catch (error: any) {
      const errorCode = error?.code;
      return { errorCode };
    }
  }

  async registerUser(credentials: Record<string, string>): Promise<Session> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const user = userCredential.user;
      await updateProfile(user, {
        displayName: credentials.displayName,
      });

      return {
        uid: user.uid,
        email: user.email,
      };
    } catch (error: any) {
      const errorCode = error?.code;
      return { errorCode };
    }
  }

  async updateUser(credentials: Record<string, unknown>): Promise<User> {
    const imagesRef = ref(storageRef, "avatars");
    const fileName = credentials.photoURL || null;
    const avatarRef = ref(imagesRef, fileName);
    const user = auth.currentUser;

    try {
      const downloadURL = await getDownloadURL(avatarRef);

      await updateProfile(user!, {
        ...credentials,
        photoURL: downloadURL || null,
      });

      return {
        uid: user!.uid,
        email: user!.email,
        displayName: user!.displayName,
        photoURL: user!.photoURL,
      };
    } catch (error: any) {
      return error;
    }
  }

  async deleteUser(credentials: Record<string, string>): Promise<any> {}

  // Note
  async fetchAllNotes(): Promise<ResponseModel<Array<Note>>> {
    // const cacheKey = "all-notes";

    // if (this.cacheManager.has(cacheKey)) {
    //   return { status: "success", data: this.cacheManager.get(cacheKey) };
    // }

    // const formatedResponse: Array<Note> = [];

    // try {
    //   const notesCol = collection(db, this.collectionName);
    //   const q = query(notesCol, orderBy("updated", "desc"));

    //   const docs = await getDocs(q);

    //   docs.forEach((doc: { id: string; data: () => any }) => {
    //     formatedResponse.push({ uuid: doc.id, ...doc.data() });
    //   });

    //   // this.cacheManager.set(cacheKey, formatedResponse);

    //   return { status: "success", data: formatedResponse };
    // } catch (error: any) {
    //   return { status: "error", error: error.message };
    // }

    return new Promise((resolve, reject) => {
      const formatedResponse: Array<Note> = [];
      const notesCol = collection(db, this.collectionName);
      const q = query(notesCol, orderBy("updatedAt", "desc"));

      // Set up the listener
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

  async createNote(data: Record<string, string>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collectionName), {
      tags: [],
      pin: false,
      color: "#FFFFFF",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...data,
    });

    return docRef.id;
  }

  async fetchNoteById(noteId: nodeId): Promise<Note> {
    return new Promise((resolve, reject) => {
      const unsub = onSnapshot(
        doc(db, this.collectionName, noteId),
        (docSnap) => {
          if (docSnap.exists()) {
            const noteData: Note = docSnap.data() as Note;
            resolve(noteData);

            unsub();
          } else {
            reject(new Error("Note not found"));

            unsub();
          }
        }
      );
    });
  }

  async updateNoteContent(
    noteId: nodeId,
    data: Record<string, any>
  ): Promise<void> {
    const notesRef = doc(db, this.collectionName, noteId);
    const updatedData = {
      ...data,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(notesRef, updatedData);
    this.cacheManager.clear(noteId);
  }

  async deleteNote(noteId: string): Promise<void> {
    const notesRef = doc(db, this.collectionName, noteId);
    await deleteDoc(notesRef);
  }
}

const texto = {
  user: {
    _redirectEventId: undefined,
    apiKey: "AIzaSyBfsZOS68bX6W_AyChJ0wGlZddF4tXJr1c",
    appName: "[DEFAULT]",
    createdAt: "1693956886340",
    displayName: undefined,
    email: "kevinparra535@gmail.com",
    emailVerified: false,
    isAnonymous: false,
    lastLoginAt: "1693956886340",
    phoneNumber: undefined,
    photoURL: undefined,
    providerData: [Array],
    stsTokenManager: [Object],
    tenantId: undefined,
    uid: "k33CySprHgg5Pvdp87yocoR5KOu1",
  },
};
