import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Home from './Home';
import Minings from './Mining';
import Locations from './Location';
import Reports from './Report';
import Users from './User';
import Settings from './Setting';
import AddTyre from "./AddTyre";


const DashboardLayout = ( {onLogout} ) => {
  return (
    <div className="flex h-screen">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/minings" element={<Minings />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/addtyres" element={<AddTyre />} />
        </Routes>
      </div>
    </div>
  )
};

export default DashboardLayout;