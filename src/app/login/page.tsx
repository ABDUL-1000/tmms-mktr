'use client';
import { LoginResponse, loginUser } from '@/lib/login';
import Link from 'next/link';
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result: LoginResponse = await loginUser(email, password);

      // Validate and store the response
      if (result.token && result.message) {
        localStorage.setItem('token', result.token);

        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }

        alert(result.message);
        window.location.href = '/'; // Redirect to the homepage
      } else {
        throw new Error('Invalid response from the server');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && (
          <p className="text-red-500 mt-2" aria-live="assertive">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded-lg`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-1 text-gray-600">
        Dont have an account?{' '}
        <Link className="text-blue-500 hover:underline"  href="/signup">
          Sign up here
        </Link>
      </p>
      </div>
    </div>
  );
};

export default LoginPage;
