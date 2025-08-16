// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDyViZpueVYNpfBmphRPBaiuJ3G7nJpK_M",
  authDomain: "kiteweb-735a9.firebaseapp.com",
  // ▼▼▼ YAHAN PAR GALTI THI, AB YEH SAHI HO GAYI HAI ▼▼▼
  databaseURL: "https://kiteweb-735a9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kiteweb-735a9",
  storageBucket: "kiteweb-735a9.firebasestorage.app",
  messagingSenderId: "257605266216",
  appId: "1:257605266216:web:a49709b08191de829dbe1d"
};

// Firebase ko initialize karo
const app = initializeApp(firebaseConfig);

// Baaki files me use karne ke liye auth aur db ko export karo
export const auth = getAuth(app);
export const db = getDatabase(app);