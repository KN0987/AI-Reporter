// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-reporter-d329a.firebaseapp.com",
  projectId: "ai-reporter-d329a",
  storageBucket: "ai-reporter-d329a.appspot.com",
  messagingSenderId: "875075203243",
  appId: "1:875075203243:web:fe1c96f4136f0d6d5947ee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);