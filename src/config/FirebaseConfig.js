// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA2ePb17r5d9b0nO6VGJHmkRH7GjQyzz0",
  authDomain: "lotomo-4f6ae.firebaseapp.com",
  databaseURL: "https://lotomo-4f6ae-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lotomo-4f6ae",
  storageBucket: "lotomo-4f6ae.firebasestorage.app",
  messagingSenderId: "703829028932",
  appId: "1:703829028932:web:760b2ca7c3930c19004c11",
  measurementId: "G-Q4BMWZXZDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
