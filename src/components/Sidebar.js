// import {
//   Squares2X2Icon,
//   Cog6ToothIcon,
//   UsersIcon,
//   DocumentTextIcon,
//   MapPinIcon,
//   BuildingOffice2Icon,
//   LifebuoyIcon,
//   ArrowLeftOnRectangleIcon,
//   PlusIcon,
// } from "@heroicons/react/24/solid";
// import { NavLink } from "react-router-dom";

// const menuItems = [
//   { name: "Dashboard", path: "/home", icon: <Squares2X2Icon className="w-5 h-5" /> },
//   { name: "Tyre Management", path: "/tyres", icon: <LifebuoyIcon className="w-5 h-5" /> },
//   { name: "Mining Units", path: "/minings", icon: <BuildingOffice2Icon className="w-5 h-5" /> },
//   { name: "Site Locations", path: "/locations", icon: <MapPinIcon className="w-5 h-5" /> },
//   { name: "Reports", path: "/reports", icon: <DocumentTextIcon className="w-5 h-5" /> },
//   { name: "User Management", path: "/users", icon: <UsersIcon className="w-5 h-5" /> },
//   { name: "Settings", path: "/settings", icon: <Cog6ToothIcon className="w-5 h-5" /> },
//   { name: "Add Tyre", path: "/addtyre", icon: <PlusIcon className="w-5 h-5" /> },
// ];

// const Sidebar = ({ onLogout }) => {
//   return (
//     <div className="bg-[#0F2741] text-white h-screen w-[290px] flex flex-col px-4 py-6 justify-between">
//       {/* Top Section - Logo and Menu */}
//       <div>
//         <div className="mb-8 text-center">
//           <div className="text-yellow-400 font-bold text-xl mb-1">TYRE<br />PRIMA JAYA</div>
//           <p className="text-xs text-gray-300">WE WILL SAVE OUR TYRE TOGETHER</p>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex flex-col gap-4">
//           {menuItems.map((item, index) => (
//             <NavLink
//               key={index}
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
//                   isActive
//                     ? "bg-yellow-400 text-black font-bold"
//                     : "bg-[#173353] text-white hover:bg-[#1c406b]"
//                 }`
//               }
//             >
//               {item.icon}
//               <span className="text-sm">{item.name}</span>
//             </NavLink>
//           ))}
//         </nav>
//       </div>

//       {/* Bottom Section - Logout */}
//       <button
//         onClick={onLogout}
//         className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#173353] hover:bg-red-600 text-white hover:text-white transition-colors"
//       >
//         <ArrowLeftOnRectangleIcon className="w-5 h-5" />
//         <span className="text-sm">Logout</span>
//       </button>
//     </div>
//   );
// };

// export default Sidebar;



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
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ onLogout }) => {
  const [isTyreDropdownOpen, setIsTyreDropdownOpen] = useState(false);

  const toggleTyreDropdown = () => {
    setIsTyreDropdownOpen(!isTyreDropdownOpen);
  };

  return (
    <div className="bg-[#0F2741] text-white h-screen w-[290px] flex flex-col px-4 py-6 justify-between">
      {/* Top Section - Logo and Menu */}
      <div>
        <div className="mb-8 text-center">
          <div className="text-yellow-400 font-bold text-xl mb-1">
            TYRE<br />PRIMA JAYA
          </div>
          <p className="text-xs text-gray-300">WE WILL SAVE OUR TYRE TOGETHER</p>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-yellow-400 text-black font-bold"
                  : "bg-[#173353] text-white hover:bg-[#1c406b]"
              }`
            }
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="text-sm">Dashboard</span>
          </NavLink>

          {/* Tyre Management with Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={toggleTyreDropdown}
              className="flex items-center justify-between px-4 py-2 rounded-lg bg-[#173353] hover:bg-[#1c406b] text-white transition-colors"
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
                      isActive ? "bg-yellow-400 text-black font-bold border-yellow-400"
                      : "bg-[#173353] text-white hover:bg-[#1c406b] border-[#2f4c73]"
                    }`
                  }
                >
                  <div className="flex items-center gap-2">
                    <PlusIcon className="w-4 h-4" />
                    Add Tyre
                  </div>
                </NavLink>
              </div>
            )}
          </div>

          {/* Other Menu Items */}
          <NavLink
            to="/minings"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors border ${
                isActive
                  ? "bg-yellow-400 text-black font-bold border-yellow-400"
                  : "bg-[#173353] text-white hover:bg-[#1c406b] border-[#2f4c73]"
              }`
            }
          >
            <BuildingOffice2Icon className="w-5 h-5" />
            <span className="text-sm">Mining Units</span>
          </NavLink>

          <NavLink
            to="/locations"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-yellow-400 text-black font-bold"
                  : "bg-[#173353] text-white hover:bg-[#1c406b]"
              }`
            }
          >
            <MapPinIcon className="w-5 h-5" />
            <span className="text-sm">Site Locations</span>
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-yellow-400 text-black font-bold"
                  : "bg-[#173353] text-white hover:bg-[#1c406b]"
              }`
            }
          >
            <DocumentTextIcon className="w-5 h-5" />
            <span className="text-sm">Reports</span>
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-yellow-400 text-black font-bold"
                  : "bg-[#173353] text-white hover:bg-[#1c406b]"
              }`
            }
          >
            <UsersIcon className="w-5 h-5" />
            <span className="text-sm">User Management</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-yellow-400 text-black font-bold"
                  : "bg-[#173353] text-white hover:bg-[#1c406b]"
              }`
            }
          >
            <Cog6ToothIcon className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section - Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#173353] hover:bg-red-600 text-white hover:text-white transition-colors"
      >
        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
        <span className="text-sm">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
