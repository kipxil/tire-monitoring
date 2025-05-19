import { TruckIcon, CheckCircleIcon, XCircleIcon, UserGroupIcon } from "@heroicons/react/24/solid";

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
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Total Unit</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-gray-700">1,250</span>
            <span className="text-green-500 text-xl"><TruckIcon className="w-10 h-10" /></span>
          </div>
        </div>

        {/* Ban Terpasang */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Ban Terpasang</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-gray-700">850</span>
            <span className="text-green-500 text-xl"><CheckCircleIcon className="w-10 h-10" /></span>
          </div>
        </div>

        {/* Ban Terlepas */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Ban Terlepas</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-gray-700">400</span>
            <span className="text-green-500 text-xl"><XCircleIcon className="w-10 h-10" /></span>
          </div>
        </div>

        {/* Total User */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <p className="text-sm text-gray-500">Total User</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-gray-700">67</span>
            <span className="text-green-500 text-xl"><UserGroupIcon className="w-10 h-10" /></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
