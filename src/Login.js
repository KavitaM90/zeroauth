import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from './firebaseConfig'; // Corrected path to firebaseConfig

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Clear any existing session ID when the login page loads
  // This ensures that if a user manually logs out or is redirected here,
  // we don't accidentally rely on a stale session ID in sessionStorage.
  useEffect(() => {
    sessionStorage.removeItem('sessionId');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Generate a unique session ID and store it locally and in Firebase
      const sessionId = Math.random().toString(36).substring(2);
      // CORRECTED: Use 'sessionId' as the key to match App.js
      sessionStorage.setItem('sessionId', sessionId);

      // Store the session ID in the Firebase Realtime Database
      await set(ref(db, 'sessions/' + user.uid), { sessionId });
      navigate('/positions'); // Navigate to positions page after successful login
    } catch (err) {
      // Set error message if login fails
      setError('Login failed. Please check your email and password.');
      console.error("Login error:", err); // Log the actual error for debugging
    }
  };

  return (
    // Main container for the login page, centered vertically and horizontally
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      {/* Login form container */}
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email input field */}
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-lg"
              placeholder="Email address"
            />
          </div>
          {/* Password input field */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-lg"
              placeholder="Password"
            />
          </div>

          {/* Error message display */}
          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}

          {/* Login button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;