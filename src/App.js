import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = sessionStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Handler login: simpan status ke state dan localStorage
  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  // Handler logout: reset state dan hapus dari localStorage
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
  };

  return (
    <>
      <Router>
        <Routes>
          {isLoggedIn ? (
            <Route
              path="/*"
              element={<DashboardLayout onLogout={handleLogout} />}
            />
          ) : (
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          )}
        </Routes>
      </Router>
      <ToastContainer
        position="top-center" // atau "bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
