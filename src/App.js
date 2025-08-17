<<<<<<< Updated upstream
import React, { useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css'
import Home from './Home';
import Login from './Login';
import Holding from './components/Holding';
import Position from './components/Position';
import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebaseConfig';
import { ref, onValue, off, remove } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { MarketDataProvider } from './custom/useMarketData';
=======
<<<<<<< HEAD
// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Navigate, HashRouter } from "react-router-dom";
import Login from "./Login";
import Home from "./Home"
import Holding from "./components/Holding";
import Position from "./components/Position";
import "./App.css";
import Nav from "./components/Nav";
import { auth } from "./firebase"; // Ensure Firebase is configured here
import { onAuthStateChanged } from "firebase/auth";
import { MarketDataProvider } from "./custom/useMarketData";
>>>>>>> Stashed changes

function App() {
  const [user, loading] = useAuthState(auth);
  const userSessionRef = useRef(null); // This ref is not currently used, can be removed if not needed elsewhere
  const navigate = useNavigate();

  // This useEffect handles the session management and logout logic
  useEffect(() => {
    // If no user is logged in, clear any existing session ID in sessionStorage
    if (!user) {
      sessionStorage.removeItem('sessionId');
      return;
    }

    // Get a reference to the user's session in the Realtime Database
    const sessionRef = ref(db, 'sessions/' + user.uid);
    // Get the session ID stored locally in the browser's sessionStorage
    const localSessionId = sessionStorage.getItem('sessionId');

    // Set up a real-time listener for changes to the user's session in the database
    // This listener will trigger whenever the session data in Firebase changes for this user.
    const unsubscribeSessionListener = onValue(sessionRef, (snapshot) => {
      const dbSessionData = snapshot.val();
      const dbSessionId = dbSessionData?.sessionId;

      // Check for session mismatch
      // If a session ID exists in the database AND locally, AND they don't match,
      // it means another login occurred, so log out the current user from this browser.
      if (dbSessionId && localSessionId && dbSessionId !== localSessionId) {
        console.log("You have been logged out because you signed in from another device or browser.");

        // Log out the user from Firebase Auth
        signOut(auth)
          .then(() => {
            sessionStorage.removeItem('sessionId'); // Clear local session ID after successful logout
            navigate('/login'); // Redirect to login page
          })
          .catch((logoutError) => {
            console.error("Error during automatic logout:", logoutError);
          });
      } else if (!dbSessionId && localSessionId) {
        // If there's a local session ID but no corresponding entry in the database,
        // it implies the database entry was removed (e.g., by manual logout from another device
        // that removed its session ID from the database).
        console.log("Database session entry missing. Logging out current user.");
        signOut(auth).then(() => {
          sessionStorage.removeItem('sessionId');
          navigate('/login');
        });
      }
    });
<<<<<<< Updated upstream
=======
    return () => unsubscribe();
  }, []);
=======
import React, { useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css'
import Home from './Home';
import Login from './Login';
import Holding from './components/Holding';
import Position from './components/Position';
import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebaseConfig';
import { ref, onValue, off, remove } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { MarketDataProvider } from './custom/useMarketData';

function App() {
  const [user, loading] = useAuthState(auth);
  const userSessionRef = useRef(null); // This ref is not currently used, can be removed if not needed elsewhere
  const navigate = useNavigate();

  // This useEffect handles the session management and logout logic
  useEffect(() => {
    // If no user is logged in, clear any existing session ID in sessionStorage
    if (!user) {
      sessionStorage.removeItem('sessionId');
      return;
    }

    // Get a reference to the user's session in the Realtime Database
    const sessionRef = ref(db, 'sessions/' + user.uid);
    // Get the session ID stored locally in the browser's sessionStorage
    const localSessionId = sessionStorage.getItem('sessionId');

    // Set up a real-time listener for changes to the user's session in the database
    // This listener will trigger whenever the session data in Firebase changes for this user.
    const unsubscribeSessionListener = onValue(sessionRef, (snapshot) => {
      const dbSessionData = snapshot.val();
      const dbSessionId = dbSessionData?.sessionId;

      // Check for session mismatch
      // If a session ID exists in the database AND locally, AND they don't match,
      // it means another login occurred, so log out the current user from this browser.
      if (dbSessionId && localSessionId && dbSessionId !== localSessionId) {
        console.log("You have been logged out because you signed in from another device or browser.");

        // Log out the user from Firebase Auth
        signOut(auth)
          .then(() => {
            sessionStorage.removeItem('sessionId'); // Clear local session ID after successful logout
            navigate('/login'); // Redirect to login page
          })
          .catch((logoutError) => {
            console.error("Error during automatic logout:", logoutError);
          });
      } else if (!dbSessionId && localSessionId) {
        // If there's a local session ID but no corresponding entry in the database,
        // it implies the database entry was removed (e.g., by manual logout from another device
        // that removed its session ID from the database).
        console.log("Database session entry missing. Logging out current user.");
        signOut(auth).then(() => {
          sessionStorage.removeItem('sessionId');
          navigate('/login');
        });
      }
    });
>>>>>>> Stashed changes

    // Cleanup function: unsubscribe from the real-time listener when the component unmounts
    // or when the user object changes (e.g., on manual logout, this useEffect will re-run
    // because `user` changes to null, and the previous listener needs to be cleaned up).
    return () => {
      // It's good practice to ensure `unsubscribeSessionListener` is a function before calling it.
      // `off` needs the ref, event type, and the callback function to specifically remove that listener.
      off(sessionRef, 'value', unsubscribeSessionListener);
    };
  }, [user, navigate]); // Dependencies: Re-run effect if `user` or `navigate` changes.

  // This function handles user logout, clearing session data from Firebase and local storage
  const handleLogout = async () => {
    if (user) {
      try {
        // IMPORTANT: Remove the session entry from the database BEFORE signing out.
        // This ensures the real-time listener in other sessions correctly detects the change
        // and logs them out. If you sign out first, `user` becomes null, and the `remove` call
        // might not execute with the correct user.uid before the effect cleans up.
        await remove(ref(db, 'sessions/' + user.uid));
        await signOut(auth); // Sign out from Firebase Auth
        sessionStorage.removeItem('sessionId'); // Clear local session ID
        navigate('/login'); // Redirect to login page
      } catch (error) {
        console.error("Error during manual logout:", error);
      }
    }
  };

<<<<<<< Updated upstream
=======
>>>>>>> fda6ae2 (single login functionality few changes in position page and styling related changes)
>>>>>>> Stashed changes

  return (
    // MarketDataProvider should wrap the Routes to provide context to all routed components
    // Added 'font-inter' class for global font styling consistent with Tailwind.
    <MarketDataProvider>
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    <HashRouter>
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
    </HashRouter>
=======
>>>>>>> Stashed changes
      <div className="font-inter">
        <Routes>
          {/* Route for login page, redirects to /positions if user is already logged in */}
          <Route
            path="/login"
            element={user && !loading ? <Navigate to="/positions" /> : <Login />}
          />
<<<<<<< Updated upstream
=======

          {/* Default route for the application, redirects to /positions if authenticated, otherwise shows login */}
          <Route
            path="/"
            element={user && !loading ? <Navigate to="/positions" /> : <Login />}
          />

          {/* Protected route for the home page, requiring authentication */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Nav onLogout={handleLogout} /> {/* Passed handleLogout */}
                <Home />
              </PrivateRoute>
            }
          />
          {/* Protected route for the holdings page */}
          <Route
            path="/holdings"
            element={
              <PrivateRoute>
                <Nav onLogout={handleLogout} /> {/* Passed handleLogout */}
                <Holding />
              </PrivateRoute>
            }
          />
          {/* Protected route for the positions page */}
          <Route
            path="/positions"
            element={
              <PrivateRoute>
                <Nav onLogout={handleLogout} /> {/* Passed handleLogout */}
                <Position />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
>>>>>>> fda6ae2 (single login functionality few changes in position page and styling related changes)
    </MarketDataProvider>
   
  );
}
>>>>>>> Stashed changes

          {/* Default route for the application, redirects to /positions if authenticated, otherwise shows login */}
          <Route
            path="/"
            element={user && !loading ? <Navigate to="/positions" /> : <Login />}
          />

          {/* Protected route for the home page, requiring authentication */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Nav onLogout={handleLogout} /> {/* Passed handleLogout */}
                <Home />
              </PrivateRoute>
            }
          />
          {/* Protected route for the holdings page */}
          <Route
            path="/holdings"
            element={
              <PrivateRoute>
                <Nav onLogout={handleLogout} /> {/* Passed handleLogout */}
                <Holding />
              </PrivateRoute>
            }
          />
          {/* Protected route for the positions page */}
          <Route
            path="/positions"
            element={
              <PrivateRoute>
                <Nav onLogout={handleLogout} /> {/* Passed handleLogout */}
                <Position />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </MarketDataProvider>
  );
}

export default App;