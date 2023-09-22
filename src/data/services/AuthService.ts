import {
  ref,
  auth,
  storageRef,
  updateProfile,
  getDownloadURL,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@/config/firebaseConfig";

import { GoogleSignin, statusCodes } from "@/config/googleConfig";

import User from "@/domain/entities/User";
import Session from "@/domain/entities/Session";


export class AuthService {
  async checkSession(): Promise<User> {
    return new Promise((resolve, reject) => {
      const unsub = onAuthStateChanged(
        auth,
        (user) => {
          if (user)
            resolve({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            });
          else resolve({ uid: null, email: null });
        },
        (error: any) => {
          const errorCode = error?.code;
          reject(new Error(errorCode));
        }
      );

      return unsub;
    });
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

  async loginGoogle(): Promise<any> {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("loginGoogle: ", userInfo);
      return { userInfo };
    } catch (error: any) {
      console.log("loginGoogle.error: ", error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        return { error };
      }
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
}