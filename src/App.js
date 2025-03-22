import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Holding from "./components/Holding";
import Position from "./components/Position";
import "./App.css";
import Nav from "./components/Nav";
import { auth, database } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, set, onValue } from "firebase/database";
import { MarketDataProvider } from "./custom/useMarketData";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Memoize handleSessionChange with useCallback
  const handleSessionChange = useCallback((currentUser) => {
    if (currentUser) {
      const userSessionRef = ref(database, `sessions/${currentUser.uid}`);

      // Mark the session as active when the user logs in
      set(userSessionRef, { isActive: true })
        .then(() => {
          console.log("Session marked as active.");
        })
        .catch((error) => {
          console.error("Error marking session as active:", error);
        });

      // Listen for changes to the user's session
      onValue(userSessionRef, (snapshot) => {
        const sessionData = snapshot.val();
        if (!sessionData || !sessionData.isActive) {
          // If the session is marked as inactive, log out the user
          signOut(auth)
            .then(() => {
              console.log("User logged out automatically due to a new session on another device.");
              setUser(null); // Update user state
              navigate("/"); // Redirect to the login page
            })
            .catch((error) => {
              console.error("Error logging out:", error);
            });
        }
      });
    }
  }, [navigate]); // Add dependencies for useCallback

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        handleSessionChange(currentUser); // Handle session changes for the logged-in user
      }
    });

    return () => unsubscribe();
  }, [handleSessionChange]); // Add handleSessionChange to the dependency array

  return (
    <MarketDataProvider>
      <Routes>
        {/* Independent Routes */}
        <Route path="/" element={<Login />} />
        
        {/* Protected routes - only accessible if logged in */}
        <Route 
          path="/home" 
          element={user ? <Nav /> : <Navigate to="/" />} 
        />
        <Route 
          path="/holdings" 
          element={user ? <><Nav /><Holding /></> : <Navigate to="/" />} 
        />
        <Route 
          path="/positions" 
          element={user ? <><Nav /><Position  /></> : <Navigate to="/" />} 
        />
        {/* Other possible routes */}
        {/* <Route path="/dashboard" element={user ? <><Nav /><Dashboard /></> : <Navigate to="/" />} /> */}
        {/* <Route path="/orders" element={user ? <><Nav /><Orders /></> : <Navigate to="/" />} /> */}
      </Routes>
    </MarketDataProvider>
  );
};

export default App;