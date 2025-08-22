import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set, onValue, off } from 'firebase/database';
import { auth, db } from './firebaseConfig';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('sessionId');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const sessionId = crypto.randomUUID();
      sessionStorage.setItem('sessionId', sessionId);

      const userSessionDbRef = ref(db, 'sessions/' + user.uid);
      await set(userSessionDbRef, { sessionId, timestamp: Date.now() });

      // Confirm DB sync
      let listenerRemoved = false;
      let confirmListener;

      const confirmSessionPromise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (!listenerRemoved) {
            off(userSessionDbRef, 'value', confirmListener);
            resolve(false);
          }
        }, 5000);

        confirmListener = onValue(
          userSessionDbRef,
          (snapshot) => {
            const dbSessionId = snapshot.val()?.sessionId;
            if (dbSessionId === sessionId) {
              clearTimeout(timeout);
              off(userSessionDbRef, 'value', confirmListener);
              listenerRemoved = true;
              resolve(true);
            }
          },
          (err) => {
            clearTimeout(timeout);
            off(userSessionDbRef, 'value', confirmListener);
            listenerRemoved = true;
            reject(err);
          }
        );
      });

      await confirmSessionPromise;
      navigate('/positions');
    } catch (err) {
      setError('Login failed. Please check your email and password.');
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
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
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              placeholder="Email address"
            />
          </div>
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
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              placeholder="Password"
            />
          </div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
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
