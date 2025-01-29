// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home"
import Holding from "./components/Holding";
import Position from "./components/Position";
import "./App.css";
import Nav from "./components/Nav";
import { auth } from "./firebase"; // Ensure Firebase is configured here
import { onAuthStateChanged } from "firebase/auth";
import { MarketDataProvider } from "./custom/useMarketData";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <MarketDataProvider>
    <Router>
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
    </Router>
    </MarketDataProvider>
   
  );
};

export default App;
