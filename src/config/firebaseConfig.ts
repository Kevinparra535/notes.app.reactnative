import { initializeApp } from "firebase/app";

import {
  getAuth,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  query,
  where,
  limit,
  getDoc,
  addDoc,
  setDoc,
  orderBy,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  onSnapshot,
  writeBatch,
  arrayRemove,
  getFirestore,
  serverTimestamp,
  QuerySnapshot,
  DocumentSnapshot,
} from "firebase/firestore";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { config } from "@/config/config";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";

// Initialize Firebase
const firebaseConfig = {
  apiKey: config.apikey,
  authDomain: config.authdomain,
  projectId: config.projectid,
  storageBucket: config.storagebucket,
  messagingSenderId: config.messagingsenderid,
  appId: config.appid,
  measurementId: config.measurementid,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore(app);
const storageRef = ref(storage);
const googleProvider = new GoogleAuthProvider();


auth.useDeviceLanguage();

export {
  db,
  doc,
  ref,
  auth,
  where,
  query,
  limit,
  setDoc,
  getDoc,
  addDoc,
  getDocs,
  orderBy,
  storage,
  updateDoc,
  deleteDoc,
  collection,
  storageRef,
  onSnapshot,
  writeBatch,
  arrayRemove,
  getFirestore,
  updateProfile,
  QuerySnapshot,
  getDownloadURL,
  googleProvider,
  serverTimestamp,
  signInWithPopup,
  DocumentSnapshot,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
