import React, { useState } from "react";
import { toast } from "react-toastify";
import logo from "../assets/bg_tambang.jpg";
import overlayimg from "../assets/type-A convert.png";
import { apiFetch } from "../services/apiClient";
import logomobile from "../assets/TYRE DEPT FIX.png";

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

    try {
      const result = await apiFetch("/user");

      // Debug: tampilkan data user dari server
      console.log("Data user dari API:", result.data);

      // Cek apakah ada user yang cocok
      const user = result.data.find(
        (u) => u.name === username && u.password === password
      );

      if (user) {
        console.log("Login berhasil sebagai:", user.name);
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("roleId", user.roleId);
        onLogin(); // Tidak kirim role — akses semua fitur
      } else {
        // alert("Username atau password salah");
        toast.error("Login gagal. Periksa Kembali username dan password!");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat login:", error);
      toast.error("Gagal menghubungi server.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 min-h-screen flex-grow flex items-center justify-center px-6 py-8">
        <div className="max-w-md w-full space-y-6">
          {/* Mobile Overlay Image */}
          <div className="block md:hidden justify-center mb-4 ml-10">
            <img src={logomobile} alt="Overlay" className="w-3/4 max-w-xs" />
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
        className="md:block md:w-[44%] bg-cover bg-center text-white relative rounded-bl-[200px] overflow-hidden"
        style={{ backgroundImage: `url(${logo})` }}
      >
        <img
          src={overlayimg}
          alt="Overlay"
          className="absolute top-[10%] left-[85%] transform -translate-x-1/2 -translate-y-1/2 w-[30%] z-10"
        />
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

// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react"; // pastikan sudah install lucide-react

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="flex min-h-screen">
//       {/* Left - Form */}
//       <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16">
//         <div className="max-w-md w-full mx-auto">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="bg-teal-700 text-white rounded-full p-2">🎓</div>
//             <h1 className="text-2xl font-bold text-teal-700">Masuk</h1>
//           </div>
//           <p className="text-gray-500 mb-6">
//             Selamat datang di platform WPU Course
//           </p>

//           <form className="space-y-4">
//             <div>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none"
//               />
//             </div>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full px-4 py-2 border rounded-lg bg-gray-100 pr-12 focus:outline-none"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-2.5 text-gray-500"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-teal-800 transition"
//             >
//               Sign In
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Right - Image with box design */}
//       <div className="hidden md:flex w-1/2 items-center justify-center relative overflow-hidden">
//         {/* Background box */}
//         <div className="bg-[#0F2741] w-[95%] h-[95%] rounded-2xl flex items-center justify-center">
//           {/* Logo */}
//           <img
//             src={overlayimg} // ganti sesuai path/logo
//             alt="Logo"
//             className="w-1/2 object-contain"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
