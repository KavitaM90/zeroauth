// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your Firebase project configuration
// IMPORTANT: Ensure this is the ONLY firebaseConfig object used in your project,
// and that the databaseURL correctly points to your Realtime Database instance.
const firebaseConfig = {
  apiKey: "AIzaSyDyViZpueVYNpfBmphRPBaiuJ3G7nJpK_M", // Use your correct API Key
  authDomain: "kiteweb-735a9.firebaseapp.com",
  // This is the correct database URL for your Realtime Database instance,
  // matching the region where your database is hosted (asia-southeast1 in this case).
  databaseURL: "https://kiteweb-735a9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kiteweb-735a9",
  storageBucket: "kiteweb-735a9.firebaseastorage.app",
  messagingSenderId: "257605266216",
  appId: "1:257605266216:web:a49709b08191de829dbe1d" // Use your correct App ID
};

// Initialize Firebase application
const app = initializeApp(firebaseConfig);

// Export Auth and Realtime Database instances for use throughout the application
export const auth = getAuth(app);
export const db = getDatabase(app);