import React, { useState, useEffect } from "react";
import { apiFetch } from "../services/apiClient";
import { toast } from "react-toastify";
import userLogo from "../assets/logo user.png";
import { Trash2 } from "lucide-react";

const User = () => {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [users, setUsers] = useState([]);

  const usersPerPage = 5; // atau ubah sesuai keinginan

  const fetchUsers = async () => {
    try {
      // const res = await fetch("https://your-api.com/users"); // Ganti dengan URL API kamu
      // const json = await res.json();
      const result = await apiFetch("/user");
      setUsers(result.data);
    } catch (err) {
      console.error("Gagal mengambil user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset ke halaman pertama saat user list berubah
  }, [users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus user ini?"
    );
    if (!confirmDelete) return;

    try {
      await apiFetch(`/user/${userId}`, {
        method: "DELETE",
      });
      toast.success("User berhasil dihapus");
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error("Gagal menghapus user:", error);
      toast.error("Terjadi kesalahan saat menghapus user");
    }
  };

  const handleSubmit = async () => {
    if (!uname || !password || !selectedRole) {
      toast.error("Mohon isi semua field yang wajib.");
      return;
    }
    const dataUser = {
      name: uname,
      password: password,
      roleId: parseInt(selectedRole),
    };

    try {
      console.log(dataUser);
      const result = await apiFetch("/user", {
        method: "POST",
        body: JSON.stringify(dataUser),
      });
      toast.success("Berhasil menambahkan user");
      await fetchUsers();
      setUname("");
      setPassword("");
      setSelectedRole("");
      // Debug: tampilkan data user dari server
      console.log("Response: ", result);
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Gagal menghubungi server");
    }
  };

  const user = JSON.parse(sessionStorage.getItem("user"));

  const loggedInUserId = user?.id;

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
          <p className="text-sm text-gray-500">Pages / Add User</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">Add User</h1>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 mt-3">
          <p className="text-lg mr-2 font-semibold">Hello, {username}</p>

          {/* Avatar */}
          <img
            src={userLogo}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-500 shadow-md"
          />
        </div>
      </div>

      {/* Content bawah header */}
      {/* Form & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Create User */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-[#0F2741] text-white p-4 rounded-t-lg font-semibold">
            Create New User Account
          </div>
          <div className="p-6 flex flex-col gap-4">
            <label className="block font-medium mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              placeholder="Create a username"
            />
            <label className="block font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <div>
              <label className="block font-medium mb-1">
                User Role <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">-- Select Role --</option>
                <option value="1">Administrator</option>
                <option value="2">TCMM</option>
                <option value="3">TISM</option>
              </select>
            </div>

            <div className="col-span-2 flex justify-between mt-4">
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500"
                >
                  Add User
                </button>
              </div>
              {/* <button className="px-6 py-2 border border-[#0F2741] rounded-md text-[#0F2741] hover:bg-gray-100">
                Cancel
              </button> */}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="bg-[#0F2741] text-white p-4 rounded-t-lg font-semibold">
            User Accounts
          </div>
          <div className="p-4 divide-y text-sm">
            {currentUsers.map((user, i) => {
              // Tentukan warna berdasarkan role
              const roleColor =
                user.roleUser.name === "admin"
                  ? "bg-black text-white"
                  : user.roleUser.name === "TCM"
                  ? "bg-orange-400 text-white"
                  : "bg-blue-500 text-white";

              // Tentukan warna status bulat berdasarkan role (dummy logic — bisa kamu ubah sesuai kebutuhan)
              const statusColor =
                user.roleUser.name === "admin"
                  ? "bg-green-500"
                  : user.roleUser.name === "TCM"
                  ? "bg-orange-400"
                  : "bg-red-500";

              const avatarColor =
                user.roleUser.name === "admin"
                  ? "bg-green-600"
                  : user.roleUser.name === "TCM"
                  ? "bg-orange-400"
                  : "bg-blue-500";

              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 text-white text-sm rounded-full flex items-center justify-center ${avatarColor}`}
                    >
                      {user.name[0].toUpperCase()}
                    </div>
                    <div>
                      {user.name}
                      {user.id === loggedInUserId && (
                        <span className="text-xs italic text-gray-500 ml-1">
                          (sedang digunakan)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center ${roleColor}`}
                    >
                      {user.roleUser.name.toUpperCase()}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${statusColor}`} />
                    <div className="flex items-center gap-4">
                      {/* Tombol Hapus */}
                      {/* <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Hapus user"
                      >
                        <Trash2 size={18} />
                      </button> */}
                      {user.id !== loggedInUserId && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Hapus user"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center space-x-2 mt-4 mb-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 rounded bg-gray-200 text-sm hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-sm">
              Page {currentPage} of {totalPages}
            </p>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 rounded bg-gray-200 text-sm hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
