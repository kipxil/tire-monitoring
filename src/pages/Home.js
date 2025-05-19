import { TruckIcon, CheckCircleIcon, XCircleIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

// bg-[#f7f9fc]
const Home = () => {
  const [tyres, setTyres] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedView, setSelectedView] = useState("ban"); // "ban" atau "unit"

  useEffect(() => {
    // Fetch data ban
    const fetchTyres = async () => {
      try {
        const response = await fetch("http://192.168.245.160:8080/tyre");
        const result = await response.json();
        setTyres(result.data);
      } catch (error) {
        console.error("Gagal mengambil data ban:", error);
      }
    };

    // Fetch data unit
    const fetchUnits = async () => {
      try {
        const response = await fetch("http://192.168.245.160:8080/unit"); // Ganti sesuai URL API unit sebenarnya
        const result = await response.json();
        setUnits(result.data);
      } catch (error) {
        console.error("Gagal mengambil data unit:", error);
      }
    };

    fetchTyres();
    fetchUnits();
  }, []);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Radio button pilihan */}
        <div className="flex justify-center mb-4 space-x-6 pb-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio"
              name="dataView"
              value="ban"
              checked={selectedView === "ban"}
              onChange={() => setSelectedView("ban")}
            />
            <span className="text-xl ml-2 text-gray-700 font-bold">Data Ban</span>
          </label>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio"
              name="dataView"
              value="unit"
              checked={selectedView === "unit"}
              onChange={() => setSelectedView("unit")}
            />
            <span className="text-xl ml-2 text-gray-700 font-bold">Data Unit</span>
          </label>
        </div>

        {/* Judul dan tabel data berdasarkan pilihan */}
        {selectedView === "ban" ? (
          <>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Data Ban</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm text-left border">
                <thead className="bg-[#0F2741] text-white">
                  <tr>
                    <th className="px-4 py-2 border">No</th>
                    <th className="px-4 py-2 border">Serial Number</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">HM (Hour Meter)</th>
                  </tr>
                </thead>
                <tbody>
                  {tyres.length > 0 ? (
                    tyres.map((tyre, index) => {
                      const status = tyre.isInstalled;
                      const hm = tyre.hmTyre;

                      return (
                        <tr key={index} className="even:bg-gray-50">
                          <td className="px-4 py-2 border">{index + 1}</td>
                          <td className="px-4 py-2 border">{tyre.serialNumber}</td>
                          <td className="px-4 py-2 border">
                            <span
                              className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                status ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                              }`}
                            >
                              {status ? "Terpasang" : "Terlepas"}
                            </span>
                          </td>
                          <td className="px-4 py-2 border">{hm} jam</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center px-4 py-3 text-gray-500">
                        Tidak ada data ban.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Data Unit</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm text-left border">
                <thead className="bg-[#0F2741] text-white">
                  <tr>
                    <th className="px-4 py-2 border">No</th>
                    <th className="px-4 py-2 border">Nomor Unit</th>
                    <th className="px-4 py-2 border">HM Unit</th>
                    <th className="px-4 py-2 border">Site</th>
                  </tr>
                </thead>
                <tbody>
                  {units.length > 0 ? (
                    units.map((unit, index) => (
                      <tr key={unit.id} className="even:bg-gray-50">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{unit.nomorUnit}</td>
                        <td className="px-4 py-2 border">{unit.hmUnit} jam</td>
                        <td className="px-4 py-2 border">{unit.site?.name || "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center px-4 py-3 text-gray-500">
                        Tidak ada data unit.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
