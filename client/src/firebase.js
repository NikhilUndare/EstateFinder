// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estatefinder-fea71.firebaseapp.com",
  projectId: "estatefinder-fea71",
  storageBucket: "estatefinder-fea71.appspot.com",
  messagingSenderId: "290187791870",
  appId: "1:290187791870:web:305c9f451a4b599de244af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);