import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import DashboardLayout from './pages/Dashboard';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userRole, setUserRole] = useState(null);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // const handleLogin = (role) => {
  //   setUserRole(role);
  //   setIsLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setUserRole(null);
  // };

  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <Route path="/*" element={<DashboardLayout onLogout={handleLogout} />} />
        ) : (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;