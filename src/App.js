import React, { useEffect } from "react";
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { ref, set, onValue } from "firebase/database";
import { signOut } from "firebase/auth";
//import Home from "./Home";
import Login from "./Login";
import Holding from "./components/Holding";
import Position from "./components/Position";
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";
import { auth, db } from "./firebaseConfig";

function App() {
  const [user, loading] = useAuthState(auth);
//  const navigate = useNavigate();

  // 🔹 Write session when user logs in
  useEffect(() => {
    if (user) {
      const sessionId = localStorage.getItem("sessionId") || uuidv4();
      localStorage.setItem("sessionId", sessionId);

      const userRef = ref(db, `sessions/${user.uid}`);
      set(userRef, {
        sessionId,
        timestamp: Date.now(),
      });
    } else {
      localStorage.removeItem("sessionId");
    }
  }, [user]);

  // 🔹 Listen for session changes in DB
  useEffect(() => {
    if (user) {
      const userRef = ref(db, `sessions/${user.uid}`);

      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log(
          "App.js Listener Fired: User:",
          user.uid,
          "Received DB Data:",
          data
        );

        const localSession = localStorage.getItem("sessionId");
        const dbSession = data?.sessionId;

        console.log(
          "App.js Debug: User:",
          user.uid,
          "Local Session:",
          localSession,
          "DB Session:",
          dbSession
        );

        // 🚨 If mismatch → force logout
        if (dbSession && dbSession !== localSession) {
          console.warn("Another session detected! Logging out this client...");
          signOut(auth);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user && <Nav />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Position />
            </PrivateRoute>
          }
        />
        <Route
          path="/holding"
          element={
            <PrivateRoute>
              <Holding />
            </PrivateRoute>
          }
        />
        <Route
          path="/position"
          element={
            <PrivateRoute>
              <Position />
            </PrivateRoute>
          }
        />
        {/* Redirect everything else */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;
