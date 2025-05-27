// import React, { useState, useEffect } from "react";
// import { apiFetch } from "../services/apiClient";

// const Inspect = () => {
//   const [tyres, setTyres] = useState([]);
//   const [selectedTyreId, setSelectedTyreId] = useState("");
//   const [units, setUnits] = useState([]);
//   const [formData, setFormData] = useState({
//     serialNumber: "",
//     isInstalled: false,
//     merk: "",
//     tread1: "",
//     tread2: "",
//     tyreSizeId: "",
//     removedPurposeId: "",
//     installedUnitId: "",
//     positionUnit: "",
//     dateTimeInstall: "",
//     dateTimeRemove: "",
//     hmUnit: "",
//     // Tambahkan field lain sesuai kebutuhan
//   });
//   const user = JSON.parse(sessionStorage.getItem("user"));
//   const [isReady, setIsReady] = useState(null);

//   const capitalizeFirst = (text) => {
//     if (!text) return "";
//     return text.charAt(0).toUpperCase() + text.slice(1);
//   };

//   const username = capitalizeFirst(user?.name);

//   useEffect(() => {
//     const fetchTyres = async () => {
//       try {
//         // const res = await fetch("http://192.168.245.160:8080/tyre"); // Ganti endpoint sesuai
//         // const data = await res.json();
//         const data = await apiFetch("/tyre");
//         setTyres(data.data || []);
//       } catch (error) {
//         console.error("Gagal fetch data ban:", error);
//       }
//     };
//     fetchTyres();
//   }, []);

//   useEffect(() => {
//     if (!selectedTyreId) return;

//     const tyre = tyres.find(
//       (t) => t.stockTyre?.id?.toString() === selectedTyreId
//     );
//     if (tyre) {
//       // Cari aktivitas install dan remove terbaru
//       // const installActivity =
//       //   tyre.activities.find((a) => a.dateTimeInstall !== null) || {};
//       // const removeActivity =
//       //   tyre.activities.find((a) => a.dateTimeRemove !== null) || {};

//       setFormData({
//         serialNumber: tyre.serialNumber || "",
//         isInstalled: tyre.isInstalled || false,
//         merk: tyre.merk || "",
//         tread1: tyre.tread1 ?? "",
//         tread2: tyre.tread2 ?? "",
//         tyreSizeId: tyre.tyreSize?.id || "",
//         removedPurposeId: tyre.removedPurpose?.id || "",
//         installedUnitId: tyre.installedUnit?.id || "",
//         positionUnit: "", // Bisa diisi jika ada data posisi di API
//         // dateTimeInstall: installActivity.dateTimeInstall
//         //   ? installActivity.dateTimeInstall.substring(0, 16)
//         //   : "",
//         // dateTimeRemove: removeActivity.dateTimeRemove
//         //   ? removeActivity.dateTimeRemove.substring(0, 16)
//         //   : "",
//         // hmUnit: installActivity.hmAtActivity || "",
//       });
//     }
//   }, [selectedTyreId, tyres]);

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const data = await apiFetch("/dropdown"); // Ganti sesuai endpoint
//         setUnits(data.unit || []);
//       } catch (error) {
//         console.error("Gagal fetch data dropdown:", error);
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   // const handleChange = (e) => {
//   //   const { name, value, type, checked } = e.target;

//   //   // Kalau isInstalled berubah, clear field kondisional jika perlu
//   //   if (name === "isInstalled") {
//   //     setFormData((prev) => ({
//   //       ...prev,
//   //       [name]: checked,
//   //       // reset data kondisional saat status berubah (opsional)
//   //       installedUnitId: checked ? prev.installedUnitId : "",
//   //       positionUnit: checked ? prev.positionUnit : "",
//   //       dateTimeInstall: checked ? prev.dateTimeInstall : "",
//   //       dateTimeRemove: checked ? prev.dateTimeRemove : "",
//   //       hmUnit: checked ? prev.hmUnit : "",
//   //       removedPurposeId: checked ? "" : prev.removedPurposeId, // misal kalau sudah dilepas harus pilih tujuan pelepasan
//   //     }));
//   //   } else {
//   //     setFormData((prev) => ({
//   //       ...prev,
//   //       [name]: type === "checkbox" ? checked : value,
//   //     }));
//   //   }
//   // };

//   const handleSubmit = async () => {
//     console.log("Payload yang dikirim:", formData);
//     try {
//       // Kirim seluruh formData ke backend (sesuaikan endpoint dan struktur API)
//       // const response = await fetch(`http://192.168.245.160:8080/tyre/${selectedTyreId}`, {
//       //   method: "PUT",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify(formData),
//       // });
//       // const result = await response.json();
//       const result = await apiFetch(`/tyre/${selectedTyreId}`, {
//         method: "PUT",
//         body: JSON.stringify(formData),
//       });
//       alert("Data ban berhasil diperbarui!");
//       console.log(result);
//     } catch (error) {
//       alert("Gagal update data ban.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="w-full bg-gray-100 p-2 rounded-md">
//       {/* Header */}
//       <div className="flex justify-between items-end mb-6 ml-3">
//         <div>
//           <p className="text-sm text-gray-500">Pages / Inspect Tyres</p>
//           <h1 className="text-3xl font-bold text-[#1a1f36]">Inspect Tyres</h1>
//         </div>
//         <div className="flex items-center gap-4 mt-3">
//           <p className="text-lg font-semibold">Hello, {username}</p>
//           <img
//             src="https://i.pravatar.cc/40"
//             alt="User Avatar"
//             className="w-12 h-12 rounded-full border-2 border-gray-500 shadow-md object-cover"
//           />
//         </div>
//       </div>

//       {/* Content */}
//       <div className="bg-[#0F2741] text-white p-4 rounded-t-lg font-semibold">
//         Inspect Tyres
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         {/* <h1 className="text-lg font-bold mb-6">Update Data Ban</h1> */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium mb-1">
//               Serial Number Ban <span className="text-red-500">*</span>
//             </label>
//             <select
//               className="w-full p-2 border rounded-md"
//               value={selectedTyreId}
//               onChange={(e) => setSelectedTyreId(e.target.value)}
//             >
//               <option value="">-- Pilih Ban --</option>
//               {tyres.map((tyre) => (
//                 <option key={tyre.id} value={tyre.stockTyre?.id}>
//                   {tyre.stockTyre?.serialNumber}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Posisi Ban</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md"
//               value={formData.positionUnit}
//               // onChange={(e) => setLokasi(e.target.value)}
//               readOnly
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Tread 1</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md"
//               value={formData.tread1}
//               // onChange={(e) => setLokasi(e.target.value)}
//               readOnly
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Tread 2</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md"
//               value={formData.tread2}
//               // onChange={(e) => setLokasi(e.target.value)}
//               readOnly
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">HM Ban</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md"
//               value={formData.hmUnit}
//               // onChange={(e) => setLokasi(e.target.value)}
//               readOnly
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Nomor Unit</label>
//             <select
//               className="w-full p-2 border rounded-md"
//               value={formData.installedUnitId}
//               disabled
//               // onChange={(e) => setNoUnit(e.target.value)}
//             >
//               <option value="">-- Pilih Unit --</option>
//               {units.map((unit) => (
//                 <option key={unit.id} value={unit.id}>
//                   {unit.nomorUnit}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Tanggal Pengerjaan</label>
//             <input
//               type="datetime-local"
//               className="w-full p-2 border rounded-md"
//               // value={lokasi}
//               // onChange={(e) => setLokasi(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">
//               Ban Siap Digunakan?
//             </label>
//             <select
//               className="w-full p-2 border rounded-md"
//               value={isReady === null ? "" : isReady.toString()}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (value === "true") setIsReady(true);
//                 else if (value === "false") setIsReady(false);
//                 else setIsReady(null);
//               }}
//             >
//               <option value="">-- Pilih Unit --</option>
//               <option value="true">YA</option>
//               <option value="false">TIDAK</option>
//               {/* {unitList.map((unit) => (
//                   <option key={unit.id} value={unit.id}>
//                     {unit.nomorUnit}
//                   </option>
//                 ))} */}
//             </select>
//           </div>
//         </div>
//         <div className="space-y-4 pt-5">
//           {isReady === false && (
//             <div className="mt-4">
//               <label className="block font-medium mb-1">
//                 Alasan Pelepasan <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded-md"
//                 placeholder="Masukkan alasan pelepasan"
//                 // onChange={(e) => setReason(e.target.value)}
//               />
//             </div>
//           )}
//           <div>
//             <label className="block font-medium mb-1">Ringkasan Kejadian</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md"
//               // value={lokasi}
//               // onChange={(e) => setLokasi(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Analisa</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md"
//               // value={lokasi}
//               // onChange={(e) => setLokasi(e.target.value)}
//             />
//           </div>
//         </div>
//         {/* Tombol Simpan */}
//         <div className="mt-8 flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500"
//           >
//             Tambah Unit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inspect;

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
  const [selectedView, setSelectedView] = useState("ban"); // "ban" atau "unit"
  const [currentPage, setCurrentPage] = useState(1);
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

  const filteredTyres = tyres.filter((tyre) => tyre.isInstalled === true);

  // Pagination logic untuk data ban
  const indexOfLastTyre = currentPage * itemsPerPage;
  const indexOfFirstTyre = indexOfLastTyre - itemsPerPage;
  const currentTyres = filteredTyres.slice(indexOfFirstTyre, indexOfLastTyre);

  // Pagination logic untuk data unit
  const indexOfLastUnit = currentPage * itemsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - itemsPerPage;
  const currentUnits = units.slice(indexOfFirstUnit, indexOfLastUnit);

  // Jumlah halaman (disesuaikan dengan data)
  const totalPages =
    selectedView === "ban"
      ? Math.ceil(tyres.length / itemsPerPage)
      : Math.ceil(units.length / itemsPerPage);

  // Fungsi pindah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fungsi untuk tombol Prev dan Next
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
        <div className="flex justify-center mb-4 space-x-6 pb-4">
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
        </div>

        {/* Judul dan tabel data berdasarkan pilihan */}
        {selectedView === "ban" ? (
          <>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Tyre Data
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
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Unit Data
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
                        <td className="px-4 py-2 border">
                          {unit.hmUnit} hours
                        </td>
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
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
