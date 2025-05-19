import {
  Squares2X2Icon,
  Cog6ToothIcon,
  UsersIcon,
  DocumentTextIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  LifebuoyIcon,
  ArrowLeftOnRectangleIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isTyreDropdownOpen, setIsTyreDropdownOpen] = useState(false);

  // Fungsi toggle dropdown
  const toggleTyreDropdown = () => setIsTyreDropdownOpen(!isTyreDropdownOpen);

  // Fungsi logout
  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redirect ke login
  };

  // Komponen link sidebar
  const SidebarLink = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          isActive
            ? "bg-yellow-400 text-black font-bold"
            : "bg-[#173353] text-white hover:bg-[#1c406b]"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </NavLink>
  );

  return (
    <div className="bg-[#0F2741] text-white h-screen w-[290px] flex flex-col px-4 py-6 justify-between">
      
      {/* Top - Logo & Menu */}
      <div>
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="text-yellow-400 font-bold text-xl leading-tight">
            TYRE<br />PRIMA JAYA
          </div>
          <p className="text-xs text-gray-300">WE WILL SAVE OUR TYRE TOGETHER</p>
        </div>

        {/* Menu Utama */}
        <nav className="flex flex-col gap-4">
          <SidebarLink to="/home" icon={Squares2X2Icon} label="Dashboard" />

          {/* Dropdown Tyre Management */}
          <div className="flex flex-col">
            <button
              onClick={toggleTyreDropdown}
              className="flex items-center justify-between px-4 py-2 rounded-lg bg-[#173353] hover:bg-[#1c406b] transition-colors"
            >
              <div className="flex items-center gap-3">
                <LifebuoyIcon className="w-5 h-5" />
                <span className="text-sm">Tyre Management</span>
              </div>
              {isTyreDropdownOpen ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>

            {isTyreDropdownOpen && (
              <div className="ml-2 mt-2 flex flex-col gap-2">
                <NavLink
                  to="/addtyres"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors border ${
                      isActive
                        ? "bg-yellow-400 text-black font-bold border-yellow-400"
                        : "bg-[#173353] text-white hover:bg-[#1c406b] border-[#2f4c73]"
                    }`
                  }
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Tyre
                </NavLink>
                <NavLink
                  to="/updtyres"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors border ${
                      isActive
                        ? "bg-yellow-400 text-black font-bold border-yellow-400"
                        : "bg-[#173353] text-white hover:bg-[#1c406b] border-[#2f4c73]"
                    }`
                  }
                >
                  <PlusIcon className="w-4 h-4" />
                  Update Tyre
                </NavLink>
              </div>
            )}
          </div>

          {/* Menu Lain */}
          {/* {role === "admin" && (
            <> */}
              <SidebarLink to="/minings" icon={BuildingOffice2Icon} label="Mining Units" />
              <SidebarLink to="/locations" icon={MapPinIcon} label="Site Locations" />
              <SidebarLink to="/reports" icon={DocumentTextIcon} label="Reports" />
              <SidebarLink to="/users" icon={UsersIcon} label="User Management" />
              <SidebarLink to="/settings" icon={Cog6ToothIcon} label="Settings" />
            {/* </>
          )} */}
        </nav>
      </div>

      {/* Bottom - Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#173353] hover:bg-red-600 text-white transition-colors"
      >
        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
        <span className="text-sm">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
