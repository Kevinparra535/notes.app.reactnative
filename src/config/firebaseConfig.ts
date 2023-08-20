import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { config } from "@/config/config";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

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

export { db, collection, doc, getDocs, getDoc };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
