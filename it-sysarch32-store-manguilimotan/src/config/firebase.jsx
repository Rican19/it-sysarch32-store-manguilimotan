// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxdLAaYn9R8bWz_cHL7rAIw3s4CMKWUeA",
  authDomain: "it-sysarch32-store-mnglmtn.firebaseapp.com",
  projectId: "it-sysarch32-store-mnglmtn",
  storageBucket: "it-sysarch32-store-mnglmtn.appspot.com",
  messagingSenderId: "389221938427",
  appId: "1:389221938427:web:10b8df63ac47abd7e86c5e",
  measurementId: "G-7WSVMM9PY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const db = getFirestore(app);
export const storage = getStorage(app)