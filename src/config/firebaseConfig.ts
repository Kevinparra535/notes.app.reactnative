import { initializeApp } from "firebase/app";


import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

import {
  doc,
  query,
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
  getFirestore,
  serverTimestamp,
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
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();
const storageRef = ref(storage);

export {
  db,
  doc,
  ref,
  auth,
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
  getFirestore,
  updateProfile,
  getDownloadURL,
  serverTimestamp,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword ,
};
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
