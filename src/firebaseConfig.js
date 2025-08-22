import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDyViZpueVYNpfBmphRPBaiuJ3G7nJpK_M",
  authDomain: "kiteweb-735a9.firebaseapp.com",
  databaseURL: "https://kiteweb-735a9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kiteweb-735a9",
  storageBucket: "kiteweb-735a9.appspot.com",
  messagingSenderId: "257605266216",
  appId: "1:257605266216:web:a49709b08191de829dbe1d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
