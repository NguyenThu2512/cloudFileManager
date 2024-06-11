// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cloudfilemanager-425408.firebaseapp.com",
  projectId: "cloudfilemanager-425408",
  storageBucket: "cloudfilemanager-425408.appspot.com",
  messagingSenderId: "300315131728",
  appId: "1:300315131728:web:4127d63ab5ef245a763655"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;