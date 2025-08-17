// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
<<<<<<< Updated upstream
import { getDatabase } from "firebase/database";
=======
<<<<<<< HEAD
=======
import { getDatabase } from "firebase/database";
>>>>>>> fda6ae2 (single login functionality few changes in position page and styling related changes)
>>>>>>> Stashed changes

// Firebase config from console
const firebaseConfig = {
  apiKey: "AIzaSyDIMe2Fot6D33HGHQh7aXj_x3ItgpB4rLE",
  authDomain: "kiteweb-735a9.firebaseapp.com",
  projectId: "kiteweb-735a9",
  storageBucket: "kiteweb-735a9.appspot.com",
  messagingSenderId: "257605266216",
<<<<<<< Updated upstream
  appId: "1:257605266216:web:f7f8aebd7eee77389dbe1d",
  databaseURL: "https://kiteweb-735a9-default-rtdb.firebaseio.com/",
=======
<<<<<<< HEAD
  appId: "1:257605266216:web:f7f8aebd7eee77389dbe1d"
=======
  appId: "1:257605266216:web:f7f8aebd7eee77389dbe1d",
  databaseURL: "https://kiteweb-735a9-default-rtdb.firebaseio.com/",
>>>>>>> fda6ae2 (single login functionality few changes in position page and styling related changes)
>>>>>>> Stashed changes
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
export const auth = getAuth(app);
=======
>>>>>>> Stashed changes

// Exports
export const auth = getAuth(app);
export const db = getDatabase(app); // renamed from 'database' to 'db'
<<<<<<< Updated upstream
=======
>>>>>>> fda6ae2 (single login functionality few changes in position page and styling related changes)
>>>>>>> Stashed changes
