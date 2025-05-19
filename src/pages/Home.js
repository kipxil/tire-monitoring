import { BellIcon, InformationCircleIcon, MoonIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, TruckIcon, CheckCircleIcon, XCircleIcon, UserGroupIcon } from "@heroicons/react/24/solid";

// bg-[#f7f9fc]
const Home = () => {
  return (
    <div className="w-full bg-gray-100 p-2 rounded-md shadow-none">
      {/* Header */}
      <div className="flex items-ends justify-between mb-6 ml-3">
        {/* Breadcrumb & Title */}
        <div>
          <p className="text-sm text-gray-500">Pages / Main Dashboard</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">Main Dashboard</h1>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 mt-3">
          <p className="text-lg mr-2 font-semibold">Hello, Admin</p>

          {/* Avatar */}
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-500 shadow-md"
          />
        </div>
      </div>

      {/* Content bawah header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Ban */}
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-top gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Unit</p>
            <h3 className="text-lg font-bold text-gray-700">1,250</h3>
          </div>
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <TruckIcon className="w-10 h-10" />
          </div>
        </div>

        {/* Ban Terpasang */}
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center gap-4">
          <div>
            <p className="text-sm text-gray-500">Ban Terpasang</p>
            <h3 className="text-lg font-bold text-gray-700">850</h3>
          </div>
          <div className="bg-green-100 text-green-600 p-2 rounded-full">
            <CheckCircleIcon className="w-10 h-10" />
          </div>
        </div>

        {/* Ban Terlepas */}
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center gap-4">
          <div>
            <p className="text-sm text-gray-500">Ban Terlepas</p>
            <h3 className="text-lg font-bold text-gray-700">400</h3>
          </div>
          <div className="bg-red-100 text-red-600 p-2 rounded-full">
            <XCircleIcon className="w-10 h-10" />
          </div>
        </div>

        {/* Total User */}
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center gap-4">
          <div>
            <p className="text-sm text-gray-500">Total User</p>
            <h3 className="text-lg font-bold text-gray-700">67</h3>
          </div>
          <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
            <UserGroupIcon className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
