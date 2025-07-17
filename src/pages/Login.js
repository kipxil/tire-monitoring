import React, { useState } from "react";
import { toast } from "react-toastify";
import logo from "../assets/bg_tambang.jpg";
import overlayimg from "../assets/type-A convert.png";
import { apiFetch } from "../services/apiClient";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // Simulasi login berhasil
  //   // if (username === "admin" && password === "password") {
  //   //   onLogin();
  //   // } else {
  //   //   alert('Username atau password salah');
  //   // }
  //   if (username === "admin" && password === "admin") {
  //     onLogin("admin");
  //   } else if (username === "worker" && password === "worker") {
  //     onLogin("worker");
  //   } else {
  //     alert("Username atau password salah");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    const dataUser = {
      name: username,
      password: password,
    };

    try {
      const result = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify(dataUser),
      });

      if (!result.token) {
        toast.error("Login gagal");
        return;
      }

      // Simpan token dan user info (jika ada)
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("isLoggedIn", "true");
      // const token = sessionStorage.getItem("token");

      const userList = await apiFetch("/user", {
        // headers: {
        //   Authorization: `Bearer ${result.token}`, // jika pakai Bearer token
        // },
      });

      const currentUser = userList.data.find((u) => u.name === username);

      if (!currentUser) {
        toast.error("Data user tidak ditemukan.");
        return;
      }

      sessionStorage.setItem("user", JSON.stringify(currentUser));
      sessionStorage.setItem("roleId", currentUser.roleUser.id);

      toast.success("Login berhasil!");
      onLogin(); // Trigger ke parent (untuk redirect ke dashboard, dll)
    } catch (error) {
      console.error("Terjadi kesalahan saat login");
      toast.error("Login gagal. Periksa username dan password.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-300">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 min-h-screen flex-grow flex items-center justify-center px-6 py-8">
        <div className="max-w-md w-full space-y-6">
          {/* Mobile Overlay Image */}
          <div className="flex justify-center mb-6">
            <img src={overlayimg} alt="Overlay" className="w-[70%] max-w-xs" />
          </div>
          <h2 className="text-3xl font-bold">Sign In</h2>
          <p className="text-sm text-gray-500">
            Enter your username and password to sign in!
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium">Username*</label>
              <input
                type="text"
                value={username}
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setUsername(e.target.value)}
                required
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
                required
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
      <div
        className="md:block md:w-[44%] bg-cover bg-center bg-gray-300 text-white relative rounded-bl-[200px] overflow-hidden bg-transparent"
        style={{ backgroundImage: `url(${logo})`, backgroundColor: "#D1D5DB" }}
      >
        {/* <img
          src={overlayimg}
          alt="Overlay"
          className="absolute top-[43%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] z-10"
        /> */}
      </div>
    </div>
  );
};

export default Login;
