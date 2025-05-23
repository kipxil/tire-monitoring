import React, { useState } from "react";

const User = () => {
  const [selectedRole, setSelectedRole] = useState("Admin");

  const handleRoleChange = (role) => setSelectedRole(role);
  const user = JSON.parse(localStorage.getItem("user"));

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const username = capitalizeFirst(user?.name);

  return (
    <div className="w-full bg-gray-100 p-2 rounded-md shadow-none">
      {/* Header */}
      <div className="flex items-ends justify-between mb-6 ml-3">
        {/* Breadcrumb & Title */}
        <div>
          <p className="text-sm text-gray-500">Pages / User Management</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">User Management</h1>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 mt-3">
          <p className="text-lg mr-2 font-semibold">Hello, {username}</p>

          {/* Avatar */}
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-500 shadow-md"
          />
        </div>
      </div>

      {/* Content bawah header */}
      {/* Statistik */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Total Users</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-3xl font-bold text-gray-800">24</span>
            <span className="text-green-500 text-xl">👤</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Active Sessions</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-3xl font-bold text-gray-800">8</span>
            <span className="text-yellow-500 text-xl">🖥️</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">New Accounts (30d)</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-3xl font-bold text-gray-800">5</span>
            <span className="text-blue-500 text-xl">➕</span>
          </div>
        </div>
      </div> */}

      {/* Form & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Create User */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-[#0F2741] text-white p-4 rounded-t-lg font-semibold">
            Create New User Account
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Enter user's full name"
            />
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Create a username"
            />
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="email"
              placeholder="user@tyreprima.com"
            />
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="+62 8xx-xxxx-xxxx"
            />
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="password"
              placeholder="Password"
            />
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="password"
              placeholder="Confirm Password"
            />

            <div className="col-span-2">
              <label className="block mb-1 text-sm font-medium">
                User Role
              </label>
              <div className="flex gap-4">
                {["Admin", "Reviewer", "Worker"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleChange(role)}
                    className={`px-4 py-1 rounded-full border font-medium ${
                      selectedRole === role
                        ? "bg-[#0F2741] text-white"
                        : "border-[#0F2741] text-[#0F2741]"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-2 flex justify-between mt-4">
              <button className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500">
                Create User
              </button>
              {/* <button className="px-6 py-2 border border-[#0F2741] rounded-md text-[#0F2741] hover:bg-gray-100">
                Cancel
              </button> */}
            </div>
          </div>
        </div>

        {/* User Account List */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-[#0F2741] text-white p-4 rounded-t-lg font-semibold">
            User Accounts
          </div>
          <div className="p-4 divide-y text-sm">
            {[
              {
                name: "Ahmad Fadli",
                role: "ADMIN",
                status: "green",
                color: "bg-green-600",
              },
              {
                name: "Budi Santoso",
                role: "REVIEWER",
                status: "green",
                color: "bg-orange-400",
              },
              {
                name: "Citra Lestari",
                role: "WORKER",
                status: "green",
                color: "bg-blue-500",
              },
              {
                name: "Deni Kurniawan",
                role: "WORKER",
                status: "orange",
                color: "bg-purple-500",
              },
              {
                name: "Eka Pratiwi",
                role: "REVIEWER",
                status: "orange",
                color: "bg-orange-400",
              },
              {
                name: "Faisal Akbar",
                role: "WORKER",
                status: "red",
                color: "bg-blue-500",
              },
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 text-white text-sm rounded-full flex items-center justify-center ${user.color}`}
                  >
                    {user.name[0]}
                  </div>
                  <div>{user.name}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === "ADMIN"
                        ? "bg-black text-white"
                        : user.role === "REVIEWER"
                        ? "bg-orange-400 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {user.role}
                  </span>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      user.status === "green"
                        ? "bg-green-500"
                        : user.status === "orange"
                        ? "bg-orange-400"
                        : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 p-4">
            {[1, 2, 3, 4].map((pg) => (
              <button
                key={pg}
                className={`w-8 h-8 rounded-full ${
                  pg === 2
                    ? "bg-[#0F2741] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {pg}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
