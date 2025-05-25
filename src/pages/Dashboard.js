import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Home from "./Home";
import AddUnit from "./AddUnit";
import Inspect from "./Inspect";
import Reports from "./Report";
import Users from "./User";
import Settings from "./Setting";
import AddTyre from "./AddTyre";
import UpdateTyre from "./ActivityTyre";

const DashboardLayout = ({ onLogout }) => {
  return (
    <div className="flex h-screen">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          {/* {role === "admin" && (
            <> */}
          <Route path="/addunit" element={<AddUnit />} />
          <Route path="/inspecttyres" element={<Inspect />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          {/* </>
          )} */}
          <Route path="/addtyres" element={<AddTyre />} />
          <Route path="/actvtyres" element={<UpdateTyre />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
