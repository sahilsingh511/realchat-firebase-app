import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCv_6GuJLS6qh2Pq1UFCYWJAKUnV7qqFH0",
    authDomain: "chat-app-ce744.firebaseapp.com",
    projectId: "chat-app-ce744",
    storageBucket: "chat-app-ce744.appspot.com",
    messagingSenderId: "333655973144",
    appId: "1:333655973144:web:59d2f81223df51c247126d"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(); 
  export const storage = getStorage();
  export const db = getFirestore();