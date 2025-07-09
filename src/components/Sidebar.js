import {
  Squares2X2Icon,
  Cog6ToothIcon,
  UsersIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  ArrowLeftOnRectangleIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Wrench, Edit } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/TYRE DEPT FIX.png";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isTyreDropdownOpen, setIsTyreDropdownOpen] = useState(false);
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 👈 untuk mobile
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    // const storedUsername = sessionStorage.getItem("username");
    const storedRoleId = sessionStorage.getItem("roleId");
    // if (storedUsername) setUsername(storedUsername);
    if (storedRoleId) setRoleId(parseInt(storedRoleId));
  }, []);

  // Fungsi toggle dropdown
  const toggleTyreDropdown = () => setIsTyreDropdownOpen(!isTyreDropdownOpen);
  const toggleUnitDropdown = () => setIsUnitDropdownOpen(!isUnitDropdownOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  // Fungsi logout
  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("roleId");
    sessionStorage.removeItem("token");
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
      onClick={() => setIsMobileMenuOpen(false)} // Tutup sidebar saat klik di mobile
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </NavLink>
  );

  return (
    <>
      {/* Hamburger button - tampil hanya di mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#0F2741] p-2 rounded"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="w-6 h-6 text-white" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Sidebar (Mobile & Desktop) */}
      <div
        className={`bg-[#0F2741] text-white fixed md:static top-0 left-0 h-full w-[260px] z-40 px-4 py-6 flex flex-col justify-between transform transition-transform duration-300
        ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Top Logo */}
        <div>
          <div className="mb-8 bg-yellow-400 rounded-md p-4 w-full">
            <div className="text-center">
              <img src={logo} className="mx-auto" alt="Tyre Prima Jaya" />
              <p className="text-xs text-black mt-1">
                WE WILL SAVE OUR TYRE TOGETHER
              </p>
            </div>
          </div>
          {/* <div className="mb-8 text-center">
            <div className="text-yellow-400 font-bold text-xl leading-tight">
              TYRE
              <br />
              PRIMA JAYA
            </div>
            <p className="text-xs text-gray-300">
              WE WILL SAVE OUR TYRE TOGETHER
            </p>
          </div> */}

          {/* Menu Utama */}
          <nav className="flex flex-col gap-4">
            <SidebarLink to="/home" icon={Squares2X2Icon} label="Dashboard" />

            {/* Tyre Dropdown */}
            <div className="flex flex-col">
              <button
                onClick={toggleTyreDropdown}
                className="flex items-center justify-between px-4 py-2 rounded-lg bg-[#173353] hover:bg-[#1c406b] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Cog6ToothIcon className="w-5 h-5" />
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
                  <SidebarLink
                    to="/addtyres"
                    icon={PlusIcon}
                    label="Add Tyre"
                  />
                  <SidebarLink
                    to="/actvtyres"
                    icon={DocumentTextIcon}
                    label="Activity Tyre"
                  />
                  <SidebarLink
                    to="/inspecttyres"
                    icon={XCircleIcon}
                    label="Inspect Tyre"
                  />
                  <SidebarLink
                    to="/inspectaction"
                    icon={Wrench}
                    label="Action Tyre"
                  />
                  {roleId === 1 && (
                    <SidebarLink to="/edittyre" icon={Edit} label="Edit Tyre" />
                  )}
                </div>
              )}
            </div>

            {/* Units Dropdown */}
            {roleId === 1 && (
              <div className="flex flex-col">
                <button
                  onClick={toggleUnitDropdown}
                  className="flex items-center justify-between px-4 py-2 rounded-lg bg-[#173353] hover:bg-[#1c406b] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BuildingOffice2Icon className="w-5 h-5" />
                    <span className="text-sm">Units Management</span>
                  </div>
                  {isUnitDropdownOpen ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>
                {isUnitDropdownOpen && (
                  <div className="ml-2 mt-2 flex flex-col gap-2">
                    <SidebarLink
                      to="/addunit"
                      icon={PlusIcon}
                      label="Add Unit"
                    />
                    <SidebarLink to="/editunit" icon={Edit} label="Edit Unit" />
                  </div>
                )}
              </div>
            )}

            {/* User Dropdown */}
            {roleId === 1 && (
              <div className="flex flex-col">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center justify-between px-4 py-2 rounded-lg bg-[#173353] hover:bg-[#1c406b] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <UsersIcon className="w-5 h-5" />
                    <span className="text-sm">User Management</span>
                  </div>
                  {isUserDropdownOpen ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>
                {isUserDropdownOpen && (
                  <div className="ml-2 mt-2 flex flex-col gap-2">
                    <SidebarLink to="/users" icon={PlusIcon} label="Add User" />
                    <SidebarLink
                      to="/settings"
                      icon={Cog6ToothIcon}
                      label="Settings"
                    />
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#173353] hover:bg-red-600 text-white transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
