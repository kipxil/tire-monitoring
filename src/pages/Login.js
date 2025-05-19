import React, { useState } from 'react';
import logo from '../assets/bg_tambang.jpg'
import overlayimg from '../assets/TYRE DEPT FIX.png'

const Login = ({ onLogin }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulasi login berhasil
        if (username === "admin" && password === "password") {
          onLogin();
        } else {
            alert('Username atau password salah');
        }
    };

    return (
    <div className="flex h-screen w-full">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex-grow flex items-center justify-center px-6">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold">Sign In</h2>
          <p className="text-sm text-gray-500">Enter your username and password to sign in!</p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium">Username*</label>
              <input
                type="text"
                value={username}
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password*</label>
              <input
                type="password"
                value={password}
                placeholder="Type your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 mt-8">
            ©2025 PT. Prima Jaya Persada Nusantara. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Background */}
      <div className="hidden md:block md:w-[44%] bg-cover bg-center text-white relative rounded-bl-[200px] overflow-hidden" style={{ backgroundImage: `url(${logo})` }}>
        <img
          src={overlayimg}
          alt='Overlay'
          className="absolute top-[43%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] z-10"
        />
      </div>
    </div>
  );
};

export default Login;
