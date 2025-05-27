import {
  TruckIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  ArchiveBoxIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/apiClient";
import TyreDetailModal from "../components/Popup";

const Home = () => {
  const [summary, setSummary] = useState({
    totalUnit: 0,
    totalTyre: 0,
    installedTyre: 0,
    removedTyre: 0,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTyre, setSelectedTyre] = useState(null);
  const [activityHistory, setActivityHistory] = useState([]);
  const [tyres, setTyres] = useState([]);
  const [units, setUnits] = useState([]);
  // const [selectedView, setSelectedView] = useState("ban"); // "ban" atau "unit"
  const [currentPageTyre, setCurrentPageTyre] = useState(1);
  const [currentPageUnit, setCurrentPageUnit] = useState(1);
  const [currentPageTyreInstall, setCurrentPageTyreInstall] = useState(1);
  const [currentPageTyreRemove, setCurrentPageTyreRemove] = useState(1);
  const [currentPageTyreScrap, setCurrentPageTyreScrap] = useState(1);
  const itemsPerPage = 10; // Jumlah data per halaman
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const username = capitalizeFirst(user?.name);

  const handleTyreClick = async (tyreId) => {
    try {
      const data = await apiFetch(`/activity/${tyreId}`);

      const tyre = {
        serialNumber: data.stockTyre.serialNumber,
        status: data.tyre.isInstalled ? "Installed" : "Not Installed",
        brand: data.stockTyre.merk.name,
        size: data.stockTyre.tyreSize.size,
        currentUnit: data.tyre.installedUnit?.nomorUnit || "N/A",
        position: `Pos ${data.tyre.positionTyre || "-"}`,
        installDate: new Date(data.tyre.createdAt).toLocaleDateString(),
        totalKm: data.tyre.kmTyre,
        avgTreadDepth: `${data.tyre.tread1}/${data.tyre.tread2}`,
      };

      const sortedActivities = [...data.activities].sort(
        (a, b) => new Date(b.dateTimeDone) - new Date(a.dateTimeDone)
      );

      const activityHistory = sortedActivities.map((act) => {
        const type =
          act.installedTyreId === data.tyre.id ? "Installation" : "Removal";

        const descriptionLines = [
          `Date: ${new Date(act.dateTimeDone).toLocaleString()}`,
          `Unit: ${act.unit?.nomorUnit}`,
          `Location: ${act.location}`,
          type === "Installation"
            ? `Tread Install: ${act.tread1Install}/${act.tread2Install}`
            : type === "Removal" &&
              act.tread1Remove != null &&
              act.tread2Remove != null
            ? `Tread Remove: ${act.tread1Remove}/${act.tread2Remove}`
            : null,
          `HM/KM: ${act.hmAtActivity}/${act.kmAtActivity}`,
          act.removePurpose?.name
            ? `Remove Purpose: ${act.removePurpose.name}`
            : null,
          act.airCondition?.name
            ? `Air Condition: ${act.airCondition.name}`
            : null,
          act.manpower ? `Manpower: ${act.manpower}` : null,
        ]
          .filter(Boolean)
          .join("\n");

        return {
          type,
          description: descriptionLines,
          date: new Date(act.createdAt).toLocaleString(),
        };
      });

      setSelectedTyre(tyre);
      setActivityHistory(activityHistory);
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedTyre(null);
    setActivityHistory([]);
  };

  useEffect(() => {
    const fetchTyres = async () => {
      try {
        const result = await apiFetch("/tyre");
        setTyres(result.data);
      } catch (error) {
        console.error("Gagal mengambil data ban:", error);
      }
    };

    const fetchUnits = async () => {
      try {
        const result = await apiFetch("/unit");
        setUnits(result.data);
      } catch (error) {
        console.error("Gagal mengambil data unit:", error);
      }
    };

    const fetchData = async () => {
      try {
        // const response = await fetch('URL_API_KAMU');
        const data = await apiFetch("/dropdown");

        const totalUnit = data.unit?.length || 0;
        const totalTyre = data.tyre?.length || 0;
        const installedTyre =
          data.tyre?.filter((t) => t.isInstalled)?.length || 0;
        const removedTyre =
          data.tyre?.filter((t) => !t.isInstalled)?.length || 0;

        setSummary({
          totalUnit,
          totalTyre,
          installedTyre,
          removedTyre,
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchTyres();
    fetchUnits();
    fetchData();
  }, []);

  const getStatus = (tyre) => {
    if (tyre.isScrap)
      return { label: "Scrap", className: "bg-gray-300 text-gray-800" };
    if (tyre.isInstalled)
      return { label: "Installed", className: "bg-green-200 text-green-700" };
    return { label: "Removed", className: "bg-red-200 text-red-700" };
  };

  const filteredTyresInstall = tyres.filter(
    (tyre) => tyre.isInstalled === true
  );
  const filteredTyresRemove = tyres.filter(
    (tyre) => tyre.isInstalled === false && tyre.isScrap === false
  );
  const filteredTyresScrap = tyres.filter((tyre) => tyre.isScrap === true);

  // Pagination logic untuk data ban
  const indexOfLastTyre = currentPageTyre * itemsPerPage;
  const indexOfFirstTyre = indexOfLastTyre - itemsPerPage;
  const currentTyres = tyres.slice(indexOfFirstTyre, indexOfLastTyre);
  const totalPagesTyre = Math.ceil(tyres.length / itemsPerPage);

  // Pagination logic untuk data unit
  const indexOfLastUnit = currentPageUnit * itemsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - itemsPerPage;
  const currentUnits = units.slice(indexOfFirstUnit, indexOfLastUnit);
  const totalPagesUnit = Math.ceil(units.length / itemsPerPage);

  //pagination logic data ban terpasang
  const indexOfLastTyreInstall = currentPageTyreInstall * itemsPerPage;
  const indexOfFirstTyreInstall = indexOfLastTyreInstall - itemsPerPage;
  const currentTyresInstall = filteredTyresInstall.slice(
    indexOfFirstTyreInstall,
    indexOfLastTyreInstall
  );
  const totalPagesTyreInstall = Math.ceil(
    filteredTyresInstall.length / itemsPerPage
  );

  //pagination logic data ban terlepas
  const indexOfLastTyreRemove = currentPageTyreRemove * itemsPerPage;
  const indexOfFirstTyreRemove = indexOfLastTyreRemove - itemsPerPage;
  const currentTyresRemove = filteredTyresRemove.slice(
    indexOfFirstTyreRemove,
    indexOfLastTyreRemove
  );
  const totalPagesTyreRemove = Math.ceil(
    filteredTyresRemove.length / itemsPerPage
  );
  //pagination logic data ban scrap
  const indexOfLastTyreScrap = currentPageTyreScrap * itemsPerPage;
  const indexOfFirstTyreScrap = indexOfLastTyreScrap - itemsPerPage;
  const currentTyresScrap = filteredTyresScrap.slice(
    indexOfFirstTyreScrap,
    indexOfLastTyreScrap
  );
  const totalPagesTyreScrap = Math.ceil(
    filteredTyresScrap.length / itemsPerPage
  );

  // Fungsi paginate tyre
  const paginateTyre = (pageNumber) => setCurrentPageTyre(pageNumber);
  const handlePrevTyre = () => {
    if (currentPageTyre > 1) setCurrentPageTyre(currentPageTyre - 1);
  };
  const handleNextTyre = () => {
    if (currentPageTyre < totalPagesTyre)
      setCurrentPageTyre(currentPageTyre + 1);
  };

  // Fungsi paginate unit
  const paginateUnit = (pageNumber) => setCurrentPageUnit(pageNumber);
  const handlePrevUnit = () => {
    if (currentPageUnit > 1) setCurrentPageUnit(currentPageUnit - 1);
  };
  const handleNextUnit = () => {
    if (currentPageUnit < totalPagesUnit)
      setCurrentPageUnit(currentPageUnit + 1);
  };

  // Fungsi paginate ban terpasang
  const paginateInstall = (pageNumber) => setCurrentPageTyreInstall(pageNumber);
  const handlePrevTyreInstall = () => {
    if (currentPageTyreInstall > 1)
      setCurrentPageTyreInstall(currentPageTyreInstall - 1);
  };
  const handleNextTyreInstall = () => {
    if (currentPageTyreInstall < totalPagesTyreInstall)
      setCurrentPageTyreInstall(currentPageTyreInstall + 1);
  };

  // Fungsi paginate ban terlepas
  const paginateRemove = (pageNumber) => setCurrentPageTyreRemove(pageNumber);
  const handlePrevTyreRemove = () => {
    if (currentPageTyreRemove > 1)
      setCurrentPageTyreRemove(currentPageTyreRemove - 1);
  };
  const handleNextTyreRemove = () => {
    if (currentPageTyreRemove < totalPagesTyreRemove)
      setCurrentPageTyreRemove(currentPageTyreRemove + 1);
  };

  // Fungsi paginate ban scrap
  const paginateScrap = (pageNumber) => setCurrentPageTyreScrap(pageNumber);
  const handlePrevTyreScrap = () => {
    if (currentPageTyreScrap > 1)
      setCurrentPageTyreScrap(currentPageTyreScrap - 1);
  };
  const handleNextTyreScrap = () => {
    if (currentPageTyreScrap < totalPagesTyreScrap)
      setCurrentPageTyreScrap(currentPageTyreScrap + 1);
  };

  return (
    <div className="w-full bg-gray-100 p-2 rounded-md shadow-none">
      {/* Header */}
      <div className="flex items-ends justify-between mb-6 ml-3">
        <div>
          <p className="text-sm text-gray-500">Pages / Main Dashboard</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">Main Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4 mt-3">
          <p className="text-lg mr-2 font-semibold">Hello, {username}</p>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-500 shadow-md"
          />
        </div>
      </div>

      {/* Content bawah header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Unit */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Unit Total</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-gray-700">
              {summary.totalUnit}
            </span>
            <span className="text-green-500 text-xl">
              <TruckIcon className="w-10 h-10" />
            </span>
          </div>
        </div>

        {/* Total Ban */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Tyre Total</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-gray-700">
              {summary.totalTyre}
            </span>
            <span className="text-green-500 text-xl">
              <ArchiveBoxIcon className="w-10 h-10" />
            </span>
          </div>
        </div>

        {/* Ban Terpasang */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Installed Tyre</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-gray-700">
              {summary.installedTyre}
            </span>
            <span className="text-green-500 text-xl">
              <CheckCircleIcon className="w-10 h-10" />
            </span>
          </div>
        </div>

        {/* Ban Terlepas */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <p className="text-sm text-gray-500">Removed Tyre</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-gray-700">
              {summary.removedTyre}
            </span>
            <span className="text-green-500 text-xl">
              <TrashIcon className="w-10 h-10" />
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Radio button pilihan */}
        {/* <div className="flex justify-center mb-4 space-x-6 pb-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio"
              name="dataView"
              value="ban"
              checked={selectedView === "ban"}
              onChange={() => {
                setSelectedView("ban");
                setCurrentPage(1); // reset halaman saat ganti view
              }}
            />
            <span className="text-xl ml-2 text-gray-700 font-bold">
              Tyre Data
            </span>
          </label>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio"
              name="dataView"
              value="unit"
              checked={selectedView === "unit"}
              onChange={() => {
                setSelectedView("unit");
                setCurrentPage(1); // reset halaman saat ganti view
              }}
            />
            <span className="text-xl ml-2 text-gray-700 font-bold">
              Unit Data
            </span>
          </label>
        </div> */}

        {/* Judul dan tabel data berdasarkan pilihan */}
        {/* {selectedView === "ban" ? ( */}
        <>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Tyre List
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left border">
              <thead className="bg-[#0F2741] text-white">
                <tr>
                  <th className="px-4 py-2 border">No</th>
                  <th className="px-4 py-2 border">Serial Number</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">HM (Hour Meter)</th>
                  <th className="px-4 py-2 border">KM (Kilo Meter)</th>
                  <th className="px-4 py-2 border">Update</th>
                </tr>
              </thead>
              <tbody>
                {currentTyres.length > 0 ? (
                  currentTyres.map((tyre, index) => {
                    const { label, className } = getStatus(tyre);
                    const hm = tyre.hmTyre ?? 0;
                    const km = tyre.kmTyre ?? 0;

                    return (
                      <tr
                        key={tyre.id}
                        className="even:bg-gray-50"
                        // onClick={() => handleTyreClick(tyre.id)} //setSelectedTyre(tyre.id)
                      >
                        <td className="px-4 py-2 border">
                          {indexOfFirstTyre + index + 1}
                        </td>
                        <td
                          className="px-4 py-2 border"
                          onClick={() => handleTyreClick(tyre.id)}
                        >
                          {tyre.stockTyre.serialNumber}
                        </td>
                        <td className="px-4 py-2 border">
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-semibold ${className}`}
                          >
                            {label}
                          </span>
                        </td>
                        <td className="px-4 py-2 border">{hm} hours</td>
                        <td className="px-4 py-2 border">{km} hours</td>
                        <td className="px-4 py-2 border text-center">
                          <PencilSquareIcon
                            className="w-6 h-6 text-blue-500 cursor-pointer mx-auto"
                            onClick={() => navigate(`/actvtyres`)}
                            title="Update Tyre"
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center px-4 py-3 text-gray-500"
                    >
                      No tire data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <TyreDetailModal
              show={showPopup}
              onClose={handleClosePopup}
              tyre={selectedTyre}
              activityHistory={activityHistory}
            />
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={handlePrevTyre}
              disabled={currentPageTyre === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPagesTyre)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginateTyre(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPageTyre === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={handleNextTyre}
              disabled={currentPageTyre === totalPagesTyre}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
        {/* ) : ( */}
        <>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Unit List
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left border">
              <thead className="bg-[#0F2741] text-white">
                <tr>
                  <th className="px-4 py-2 border">No</th>
                  <th className="px-4 py-2 border">Unit Number</th>
                  <th className="px-4 py-2 border">HM Unit</th>
                  <th className="px-4 py-2 border">KM (Kilo Meter)</th>
                  <th className="px-4 py-2 border">Site</th>
                  {/* <th className="px-4 py-2 border">Update</th> */}
                </tr>
              </thead>
              <tbody>
                {currentUnits.length > 0 ? (
                  currentUnits.map((unit, index) => (
                    <tr key={unit.id} className="even:bg-gray-50">
                      <td className="px-4 py-2 border">
                        {indexOfFirstUnit + index + 1}
                      </td>
                      <td
                        className="px-4 py-2 border"
                        onClick={() => handleTyreClick(unit.id)}
                      >
                        {unit.nomorUnit}
                      </td>
                      <td className="px-4 py-2 border">{unit.hmUnit} hours</td>
                      <td className="px-4 py-2 border">{unit.kmUnit} KM</td>
                      <td className="px-4 py-2 border">
                        {unit.site?.name || "-"}
                      </td>
                      {/* <td className="px-4 py-2 border text-center">
                          <PencilSquareIcon
                            className="w-6 h-6 text-blue-500 cursor-pointer mx-auto"
                            onClick={() => navigate(`/update-tyre/${unit.id}`)}
                            title="Update Data Unit"
                          />
                        </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center px-4 py-3 text-gray-500"
                    >
                      No data unit.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <TyreDetailModal
              show={showPopup}
              onClose={handleClosePopup}
              tyre={selectedTyre}
              activityHistory={activityHistory}
            />
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={handlePrevUnit}
              disabled={currentPageUnit === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPagesUnit)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginateUnit(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPageUnit === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={handleNextUnit}
              disabled={currentPageUnit === totalPagesUnit}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
        {/* )} */}
        <>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Tyre Installed
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left border">
              <thead className="bg-[#0F2741] text-white">
                <tr>
                  <th className="px-4 py-2 border">No</th>
                  <th className="px-4 py-2 border">Serial Number</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">HM (Hour Meter)</th>
                  <th className="px-4 py-2 border">KM (Kilo Meter)</th>
                  <th className="px-4 py-2 border">Update</th>
                </tr>
              </thead>
              <tbody>
                {currentTyresInstall.length > 0 ? (
                  currentTyresInstall.map((tyre, index) => {
                    const { label, className } = getStatus(tyre);
                    const hm = tyre.hmTyre ?? 0;
                    const km = tyre.kmTyre ?? 0;

                    return (
                      <tr
                        key={tyre.id}
                        className="even:bg-gray-50"
                        // onClick={() => handleTyreClick(tyre.id)} //setSelectedTyre(tyre.id)
                      >
                        <td className="px-4 py-2 border">
                          {indexOfFirstTyreInstall + index + 1}
                        </td>
                        <td
                          className="px-4 py-2 border"
                          onClick={() => handleTyreClick(tyre.id)}
                        >
                          {tyre.stockTyre.serialNumber}
                        </td>
                        <td className="px-4 py-2 border">
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-semibold ${className}`}
                          >
                            {label}
                          </span>
                        </td>
                        <td className="px-4 py-2 border">{hm} hours</td>
                        <td className="px-4 py-2 border">{km} hours</td>
                        <td className="px-4 py-2 border text-center">
                          <PencilSquareIcon
                            className="w-6 h-6 text-blue-500 cursor-pointer mx-auto"
                            onClick={() => navigate(`/actvtyres`)}
                            title="Update Tyre"
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center px-4 py-3 text-gray-500"
                    >
                      No tire data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <TyreDetailModal
            show={showPopup}
            onClose={handleClosePopup}
            tyre={selectedTyre}
            activityHistory={activityHistory}
          /> */}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={handlePrevTyreInstall}
              disabled={currentPageTyreInstall === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPagesTyreInstall)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginateInstall(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPageTyreInstall === i + 1
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={handleNextTyreInstall}
              disabled={currentPageTyreInstall === totalPagesTyreInstall}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
        <>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Tyre Removed
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left border">
              <thead className="bg-[#0F2741] text-white">
                <tr>
                  <th className="px-4 py-2 border">No</th>
                  <th className="px-4 py-2 border">Serial Number</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">HM (Hour Meter)</th>
                  <th className="px-4 py-2 border">KM (Kilo Meter)</th>
                  <th className="px-4 py-2 border">Update</th>
                </tr>
              </thead>
              <tbody>
                {currentTyresRemove.length > 0 ? (
                  currentTyresRemove.map((tyre, index) => {
                    const { label, className } = getStatus(tyre);
                    const hm = tyre.hmTyre ?? 0;
                    const km = tyre.kmTyre ?? 0;

                    return (
                      <tr
                        key={tyre.id}
                        className="even:bg-gray-50"
                        // onClick={() => handleTyreClick(tyre.id)} //setSelectedTyre(tyre.id)
                      >
                        <td className="px-4 py-2 border">
                          {indexOfFirstTyreRemove + index + 1}
                        </td>
                        <td
                          className="px-4 py-2 border"
                          onClick={() => handleTyreClick(tyre.id)}
                        >
                          {tyre.stockTyre.serialNumber}
                        </td>
                        <td className="px-4 py-2 border">
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-semibold ${className}`}
                          >
                            {label}
                          </span>
                        </td>
                        <td className="px-4 py-2 border">{hm} hours</td>
                        <td className="px-4 py-2 border">{km} hours</td>
                        <td className="px-4 py-2 border text-center">
                          <PencilSquareIcon
                            className="w-6 h-6 text-blue-500 cursor-pointer mx-auto"
                            onClick={() => navigate(`/actvtyres`)}
                            title="Update Tyre"
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center px-4 py-3 text-gray-500"
                    >
                      No tire data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <TyreDetailModal
            show={showPopup}
            onClose={handleClosePopup}
            tyre={selectedTyre}
            activityHistory={activityHistory}
          /> */}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={handlePrevTyreRemove}
              disabled={currentPageTyreRemove === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPagesTyreRemove)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginateRemove(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPageTyreRemove === i + 1
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={handleNextTyreRemove}
              disabled={currentPageTyreRemove === totalPagesTyreRemove}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
        <>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Tyre Scrap
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left border">
              <thead className="bg-[#0F2741] text-white">
                <tr>
                  <th className="px-4 py-2 border">No</th>
                  <th className="px-4 py-2 border">Serial Number</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">HM (Hour Meter)</th>
                  <th className="px-4 py-2 border">KM (Kilo Meter)</th>
                  <th className="px-4 py-2 border">Update</th>
                </tr>
              </thead>
              <tbody>
                {currentTyresScrap.length > 0 ? (
                  currentTyresScrap.map((tyre, index) => {
                    const { label, className } = getStatus(tyre);
                    const hm = tyre.hmTyre ?? 0;
                    const km = tyre.kmTyre ?? 0;

                    return (
                      <tr
                        key={tyre.id}
                        className="even:bg-gray-50"
                        // onClick={() => handleTyreClick(tyre.id)} //setSelectedTyre(tyre.id)
                      >
                        <td className="px-4 py-2 border">
                          {indexOfFirstTyreScrap + index + 1}
                        </td>
                        <td
                          className="px-4 py-2 border"
                          onClick={() => handleTyreClick(tyre.id)}
                        >
                          {tyre.stockTyre.serialNumber}
                        </td>
                        <td className="px-4 py-2 border">
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-semibold ${className}`}
                          >
                            {label}
                          </span>
                        </td>
                        <td className="px-4 py-2 border">{hm} hours</td>
                        <td className="px-4 py-2 border">{km} hours</td>
                        <td className="px-4 py-2 border text-center">
                          <PencilSquareIcon
                            className="w-6 h-6 text-blue-500 cursor-pointer mx-auto"
                            onClick={() => navigate(`/actvtyres`)}
                            title="Update Tyre"
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center px-4 py-3 text-gray-500"
                    >
                      No tire data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <TyreDetailModal
            show={showPopup}
            onClose={handleClosePopup}
            tyre={selectedTyre}
            activityHistory={activityHistory}
          /> */}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={handlePrevTyreScrap}
              disabled={currentPageTyreScrap === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPagesTyreScrap)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginateScrap(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPageTyreScrap === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={handleNextTyreScrap}
              disabled={currentPageTyreScrap === totalPagesTyreScrap}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default Home;
