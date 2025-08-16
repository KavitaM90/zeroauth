// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig'; // Correct: from src/components, firebaseConfig is one level up (in src/)

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // Show loading while Firebase auth state is being determined
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;