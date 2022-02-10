import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "chiralsg.firebaseapp.com",
    projectId: "chiralsg",
    storageBucket: "chiralsg.appspot.com",
    messagingSenderId: "506822929783",
    appId: "1:506822929783:web:bcee8bab60a924db14c572",
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, "asia-southeast1");
const db = getFirestore(app);

export { app, functions, db };
