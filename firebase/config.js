// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "clone-ff05e.firebaseapp.com",
  projectId: "clone-ff05e",
  storageBucket: "clone-ff05e.appspot.com",
  messagingSenderId: "951333211046",
  appId: "1:951333211046:web:e1ece90d62a03c8d5a1d67",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth();
export const db = getFirestore();
export default app;
