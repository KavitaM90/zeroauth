// src/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth function for email/password login
import { ref, set } from 'firebase/database'; // Realtime Database functions: ref to create reference, set to write data
import { auth, db } from './firebaseConfig'; // Import Firebase auth and db instances

function Login() {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for displaying login errors
  const navigate = useNavigate(); // Hook for programmatic navigation

  // useEffect hook to run once when the component mounts.
  // It ensures that any lingering `sessionId` in sessionStorage is cleared
  // when the login page is loaded, providing a clean slate for new logins.
  useEffect(() => {
    sessionStorage.removeItem('sessionId');
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // `handleLogin` function is called when the login form is submitted.
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    setError(''); // Clear any previous error messages

    try {
      // Attempt to sign in the user with provided email and password using Firebase Auth.
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the authenticated user object from the credential

      // --- Session ID Generation and Storage ---
      // 1. Generate a simple, unique session ID.
      //    `Math.random().toString(36).substring(2)` creates a random alphanumeric string.
      const sessionId = Math.random().toString(36).substring(2);

      // 2. Store this unique `sessionId` in the browser's `sessionStorage`.
      //    `sessionStorage` is cleared when the browser tab is closed.
      sessionStorage.setItem('sessionId', sessionId);

      // 3. IMPORTANT: Store the generated `sessionId` in the Firebase Realtime Database.
      //    This is crucial for cross-device/tab session management.
      //    The path is `sessions/<user_uid>`, and we set an object `{ sessionId: sessionId }`.
      await set(ref(db, 'sessions/' + user.uid), { sessionId });

      // After successful login and session setup, navigate the user to the '/positions' page.
      navigate('/positions');
    } catch (err) {
      // If login fails (e.g., incorrect credentials, network issues), catch the error.
      // Set a user-friendly error message.
      setError('Login failed. Please check your email and password.');
      // Log the actual Firebase error to the console for debugging purposes.
      console.error("Login error:", err);
    }
  };

  return (
    // Main container div for the login page, using Tailwind CSS for styling.
    // It centers the content vertically (`min-h-screen flex items-center`)
    // and horizontally (`justify-center`). `bg-gray-100` for background color,
    // `p-4` for padding, and `font-inter` for global font.
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      {/* Inner container for the login form itself. */}
      {/* `bg-white` for background, `p-8` for padding, `rounded-lg` for rounded corners,
          `shadow-xl` for a prominent shadow, `max-w-md` to limit max width,
          `w-full` to make it take full width up to max-w, `space-y-6` for vertical spacing. */}
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Welcome Back!
        </h2>
        {/* Login form with an onSubmit handler */}
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

          {/* Error message display: conditionally rendered if `error` state is not empty */}
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