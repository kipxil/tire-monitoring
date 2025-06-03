import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Home from "./Home";
import AddUnit from "./AddUnit";
import Inspect from "./Inspect";
import Users from "./User";
import Settings from "./Setting";
import AddTyre from "./AddTyre";
import UpdateTyre from "./ActivityTyre";
import EditTyre from "./EditTyre";
import InspectAction from "./InspectAction";
import EditUnit from "./EditUnit";

const DashboardLayout = ({ onLogout }) => {
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    // const storedUsername = sessionStorage.getItem("username");
    const storedRoleId = sessionStorage.getItem("roleId");
    // if (storedUsername) setUsername(storedUsername);
    if (storedRoleId) setRoleId(parseInt(storedRoleId));
  }, []);
  return (
    <div className="flex h-screen">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addtyres" element={<AddTyre />} />
          <Route path="/actvtyres" element={<UpdateTyre />} />
          <Route path="/inspecttyres" element={<Inspect />} />
          <Route path="/inspectaction" element={<InspectAction />} />
          {roleId === 1 && (
            <>
              <Route path="/edittyre" element={<EditTyre />} />
              <Route path="/addunit" element={<AddUnit />} />
              <Route path="/editunit" element={<EditUnit />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
