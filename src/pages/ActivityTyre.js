// import React, { useState, useEffect } from "react";

// const UpdateTyre = () => {
//   const [tyres, setTyres] = useState([]);
//   const [selectedTyreId, setSelectedTyreId] = useState("");
//   const [formData, setFormData] = useState({
//     serialNumber: "",
//     isInstalled: false,
//     merk: "",
//     tread1: "",
//     tread2: "",
//     tyreSizeId: "",
//     removedPurposeId: "",
//     // tambahkan field lain sesuai kebutuhan
//   });

//   useEffect(() => {
//     const fetchTyres = async () => {
//       try {
//         const res = await fetch("http://192.168.245.160:8080/tyre"); // ganti endpoint sesuai
//         const data = await res.json();
//         setTyres(data.data || []);
//       } catch (error) {
//         console.error("Gagal fetch data ban:", error);
//       }
//     };
//     fetchTyres();
//   }, []);

//   useEffect(() => {
//     if (!selectedTyreId) return;

//     const tyre = tyres.find((t) => t.id.toString() === selectedTyreId);
//     if (tyre) {
//       setFormData({
//         serialNumber: tyre.serialNumber || "",
//         isInstalled: tyre.isInstalled || false,
//         merk: tyre.merk || "",
//         tread1: tyre.tread1 ?? "",
//         tread2: tyre.tread2 ?? "",
//         tyreSizeId: tyre.tyreSize?.id || "",
//         removedPurposeId: tyre.removedPurpose?.id || "",
//         // isi field lain sesuai struktur data
//       });
//     }
//   }, [selectedTyreId, tyres]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       // sesuaikan body dan endpoint API update
//       const response = await fetch(`http://192.168.245.160:8080/tyre/${selectedTyreId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const result = await response.json();
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
//           <p className="text-sm text-gray-500">Pages / Update Tyres</p>
//           <h1 className="text-3xl font-bold text-[#1a1f36]">Update Tyres</h1>
//         </div>
//         <div className="flex items-center gap-4 mt-3">
//           <p className="text-lg font-semibold">Hello, Admin</p>
//           <img
//             src="https://i.pravatar.cc/40"
//             alt="User Avatar"
//             className="w-12 h-12 rounded-full border-2 border-gray-500 shadow-md object-cover"
//           />
//         </div>
//       </div>
      
//       {/* Content Utama Dibawah */}
//       <div className="p-4 max-w-3xl mx-auto bg-white rounded shadow">
//         <h1 className="text-2xl font-bold mb-6">Update Data Ban</h1>

//         <label className="block mb-2 font-semibold" htmlFor="tyreSelect">
//             Pilih Serial Number Ban
//         </label>
//         <select
//             id="tyreSelect"
//             value={selectedTyreId}
//             onChange={(e) => setSelectedTyreId(e.target.value)}
//             className="w-full p-2 border rounded mb-6"
//         >
//             <option value="">-- Pilih Serial Number --</option>
//             {tyres.map((tyre) => (
//             <option key={tyre.id} value={tyre.id}>
//                 {tyre.serialNumber}
//             </option>
//             ))}
//         </select>

//         {selectedTyreId && (
//             <>
//             <div className="mb-4">
//                 <label className="block mb-1 font-semibold">Nomor Seri Ban</label>
//                 <input
//                 name="serialNumber"
//                 type="text"
//                 value={formData.serialNumber}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-1 font-semibold">Merk</label>
//                 <input
//                 name="merk"
//                 type="text"
//                 value={formData.merk}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 />
//             </div>

//             <div className="mb-4 grid grid-cols-2 gap-4">
//                 <div>
//                 <label className="block mb-1 font-semibold">Tread 1</label>
//                 <input
//                     name="tread1"
//                     type="number"
//                     value={formData.tread1}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                 />
//                 </div>
//                 <div>
//                 <label className="block mb-1 font-semibold">Tread 2</label>
//                 <input
//                     name="tread2"
//                     type="number"
//                     value={formData.tread2}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                 />
//                 </div>
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-1 font-semibold">Status Instalasi</label>
//                 <input
//                 name="isInstalled"
//                 type="checkbox"
//                 checked={formData.isInstalled}
//                 onChange={handleChange}
//                 className="mr-2"
//                 />
//                 Terpasang
//             </div>

//             {/* Tambahkan field lain sesuai kebutuhan */}

//             <button
//                 onClick={handleSubmit}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//                 Simpan Perubahan
//             </button>
//             </>
//         )}
//         </div>
//     </div>
//   );
// };
// export default UpdateTyre;



import React, { useState, useEffect } from "react";
import { apiFetch } from "../services/apiClient";

const UpdateTyre = () => {
  const [tyres, setTyres] = useState([]);
  const [selectedTyreId, setSelectedTyreId] = useState("");
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    serialNumber: "",
    isInstalled: false,
    merk: "",
    tread1: "",
    tread2: "",
    tyreSizeId: "",
    removedPurposeId: "",
    installedUnitId: "",
    positionUnit: "",
    dateTimeInstall: "",
    dateTimeRemove: "",
    hmUnit: "",
    // Tambahkan field lain sesuai kebutuhan
  });

  useEffect(() => {
    const fetchTyres = async () => {
      try {
        // const res = await fetch("http://192.168.245.160:8080/tyre"); // Ganti endpoint sesuai
        // const data = await res.json();
        const data = await apiFetch("/tyre");
        setTyres(data.data || []);
      } catch (error) {
        console.error("Gagal fetch data ban:", error);
      }
    };
    fetchTyres();
  }, []);

  useEffect(() => {
    if (!selectedTyreId) return;

    const tyre = tyres.find((t) => t.id.toString() === selectedTyreId);
    if (tyre) {
      // Cari aktivitas install dan remove terbaru
      const installActivity = tyre.activities.find((a) => a.dateTimeInstall !== null) || {};
      const removeActivity = tyre.activities.find((a) => a.dateTimeRemove !== null) || {};

      setFormData({
        serialNumber: tyre.serialNumber || "",
        isInstalled: tyre.isInstalled || false,
        merk: tyre.merk || "",
        tread1: tyre.tread1 ?? "",
        tread2: tyre.tread2 ?? "",
        tyreSizeId: tyre.tyreSize?.id || "",
        removedPurposeId: tyre.removedPurpose?.id || "",
        installedUnitId: tyre.installedUnit?.id || "",
        positionUnit: "", // Bisa diisi jika ada data posisi di API
        dateTimeInstall: installActivity.dateTimeInstall ? installActivity.dateTimeInstall.substring(0, 16) : "",
        dateTimeRemove: removeActivity.dateTimeRemove ? removeActivity.dateTimeRemove.substring(0, 16) : "",
        hmUnit: installActivity.hmAtActivity || "",
      });
    }
  }, [selectedTyreId, tyres]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const data = await apiFetch("/dropdown"); // Ganti sesuai endpoint
        setUnits(data.unit || []);
      } catch (error) {
        console.error("Gagal fetch data dropdown:", error);
      }
    };

    fetchDropdownData();
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Kalau isInstalled berubah, clear field kondisional jika perlu
    if (name === "isInstalled") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        // reset data kondisional saat status berubah (opsional)
        installedUnitId: checked ? prev.installedUnitId : "",
        positionUnit: checked ? prev.positionUnit : "",
        dateTimeInstall: checked ? prev.dateTimeInstall : "",
        dateTimeRemove: checked ? prev.dateTimeRemove : "",
        hmUnit: checked ? prev.hmUnit : "",
        removedPurposeId: checked ? "" : prev.removedPurposeId, // misal kalau sudah dilepas harus pilih tujuan pelepasan
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async () => {
      console.log("Payload yang dikirim:", formData);
    try {
      // Kirim seluruh formData ke backend (sesuaikan endpoint dan struktur API)
      // const response = await fetch(`http://192.168.245.160:8080/tyre/${selectedTyreId}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      // const result = await response.json();
      const result = await apiFetch(`/tyre/${selectedTyreId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      alert("Data ban berhasil diperbarui!");
      console.log(result);
    } catch (error) {
      alert("Gagal update data ban.");
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-gray-100 p-2 rounded-md">
      {/* Header */}
      <div className="flex justify-between items-end mb-6 ml-3">
        <div>
          <p className="text-sm text-gray-500">Pages / Update Tyres</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">Update Tyres</h1>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <p className="text-lg font-semibold">Hello, Admin</p>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-gray-500 shadow-md object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#0F2741] text-white p-4 rounded-t-lg font-semibold">Update Tyres</div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-lg font-bold mb-6">Update Data Ban</h1>

        <label className="block mb-2 font-semibold" htmlFor="tyreSelect">
          Pilih Serial Number Ban
        </label>
        <select
          id="tyreSelect"
          value={selectedTyreId}
          onChange={(e) => setSelectedTyreId(e.target.value)}
          className="w-full p-2 border rounded mb-6"
        >
          <option value="">-- Pilih Serial Number --</option>
          {tyres.map((tyre) => (
            <option key={tyre.id} value={tyre.id}>
              {tyre.serialNumber}
            </option>
          ))}
        </select>

        {selectedTyreId && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Nomor Seri Ban</label>
              <input
                name="serialNumber"
                type="text"
                value={formData.serialNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Merk</label>
              <input
                name="merk"
                type="text"
                value={formData.merk}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Tread 1</label>
                <input
                  name="tread1"
                  type="number"
                  value={formData.tread1}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Tread 2</label>
                <input
                  name="tread2"
                  type="number"
                  value={formData.tread2}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="mb-4 flex items-center">
              <input
                name="isInstalled"
                type="checkbox"
                checked={formData.isInstalled}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="font-semibold">Terpasang</label>
            </div>

            {/* Kondisional: jika terpasang, tampilkan data instalasi */}
            {formData.isInstalled ? (
              <>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Unit Kendaraan</label>
                  {/* <input
                    name="installedUnitId"
                    type="text"
                    value={formData.installedUnitId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="ID Unit Kendaraan"
                  /> */}
                  <select
                    name="installedUnitId"
                    value={formData.installedUnitId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">-- Pilih Unit --</option>
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.nomorUnit}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Tanggal & Waktu Pemasangan</label>
                  <input
                    name="dateTimeInstall"
                    type="datetime-local"
                    value={formData.dateTimeInstall}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">HM Unit</label>
                  <input
                    name="hmUnit"
                    type="number"
                    value={formData.hmUnit}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </>
            ) : (
              /* Jika tidak terpasang, tampilkan data pelepasan */
              <>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Tanggal & Waktu Pelepasan</label>
                  <input
                    name="dateTimeRemove"
                    type="datetime-local"
                    value={formData.dateTimeRemove}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Tujuan Pelepasan</label>
                  <input
                    name="removedPurposeId"
                    type="text"
                    value={formData.removedPurposeId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="ID Tujuan Pelepasan"
                  />
                </div>
              </>
            )}

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateTyre;
