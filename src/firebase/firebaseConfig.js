// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpeiEqRjidGkYZqB9deiJbMMNz6mQOHF0",
  authDomain: "academy-it-2024.firebaseapp.com",
  projectId: "academy-it-2024",
  storageBucket: "academy-it-2024.appspot.com",
  messagingSenderId: "799277408252",
  appId: "1:799277408252:web:db65ea549a1278acc1dc79"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
