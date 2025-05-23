// import { apiFetch } from "../services/apiClient";
// import React, { useState, useEffect } from "react";

// const AddUnit = () => {
//   const [noUnit, setNoUnit] = useState("");
//   const [hmunit, setHmUnit] = useState("");
//   const [kmUnit, setKmUnit] = useState("");
//   const [site, setSite] = useState("");
//   const [lokasi, setLokasi] = useState("");
//   const [ban1, setBan1] = useState("");

//   const [siteList, setSiteList] = useState([]);
//   const [ban1List, setBan1List] = useState([]);

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const data = await apiFetch("/dropdown");

//         // Set state dari response API
//         // siteList(data.merk || []);
//         // setUkuranList(data.tyreSize || []);
//         setSiteList(data.site || []);
//         setBan1List(data.tyre || []);
//       } catch (error) {
//         console.error("Gagal fetch data dropdown:", error);
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   const handleSubmit = async () => {
//     // const isoDateTimeInstall = dateTimeInstall//+":00Z"; // konversi ke ISO string
//     // const isoDateTimeRemove = dateTimeRemove//+":00Z";
//     const dataUnit = {
//       // merkId: parseInt(merk),
//       // serialNumber: serialNumber,
//       // type: typeBan,
//       // pattern: patternBan,
//       // otd: parseInt(otd),
//       // price: parseInt(hargaBan),
//       // tyreSizeId: parseInt(ukuranBan),
//     };

//     try {
//       console.log(dataUnit);
//       const result = await apiFetch("/unit", {
//         method: "POST",
//         body: JSON.stringify(dataUnit),
//       });
//       alert(result);
//       // Debug: tampilkan data user dari server
//       console.log("Response: ", result);
//     } catch (error) {
//       console.error("Error: ", error);
//       alert("Gagal menghubungi server." + error.message);
//     }
//   };

//   return (
//     <div className="w-full bg-gray-100 p-2 rounded-md">
//       {/* Header */}
//       <div className="flex justify-between items-end mb-6 ml-3">
//         <div>
//           <p className="text-sm text-gray-500">Pages / Add Units</p>
//           <h1 className="text-3xl font-bold text-[#1a1f36]">Add Units</h1>
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

//       {/* Content */}
//       <div className="bg-[#0F2741] text-white p-4 rounded-t-lg font-semibold">
//         Add Units
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         {/* Tambahkan form dibawah sini */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium mb-1">
//               Nomor Unit <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md"
//               value={noUnit}
//               onChange={(e) => setNoUnit(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">
//               HM Unit <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               className="w-full p-2 border rounded-md"
//               value={hmunit}
//               onChange={(e) => setHmUnit(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">
//               KM Unit <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               className="w-full p-2 border rounded-md"
//               value={kmUnit}
//               onChange={(e) => setKmUnit(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">
//               Site <span className="text-red-500">*</span>
//             </label>
//             <select
//               className="w-full p-2 border rounded-md"
//               value={site}
//               onChange={(e) => setSite(e.target.value)}
//             >
//               <option value="">-- Pilih Site --</option>
//               {siteList.map((size) => (
//                 <option key={size.id} value={size.id}>
//                   {size.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block font-medium mb-1">
//               Lokasi <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md"
//               // value={}
//               // onChange={}
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block font-medium mb-1">
//             Ban 1 <span className="text-red-500">*</span>
//           </label>
//           <select
//             className="w-full p-2 border rounded-md"
//             value={ban1}
//             onChange={(e) => setBan1(e.target.value)}
//           >
//             <option value="">-- Pilih Ban --</option>
//             {ban1List.map((ban) => (
//               <option key={ban.stockTyre.id} value={ban.stockTyre.id}>
//                 {ban.stockTyre.serialNumber}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block font-medium mb-1">
//             Ban 2 <span className="text-red-500">*</span>
//           </label>
//           <select
//             className="w-full p-2 border rounded-md"
//             // value={tyreSizeId}
//             // onChange={(e) => setTyreSizeId(e.target.value)}
//           >
//             <option value="">-- Pilih Ban --</option>
//             {/* {tyreSizes.map((size) => (
//               <option key={size.id} value={size.id}>
//                 {size.size}
//               </option>
//             ))} */}
//           </select>
//         </div>
//         <div>
//           <label className="block font-medium mb-1">
//             Ban 3 <span className="text-red-500">*</span>
//           </label>
//           <select
//             className="w-full p-2 border rounded-md"
//             // value={tyreSizeId}
//             // onChange={(e) => setTyreSizeId(e.target.value)}
//           >
//             <option value="">-- Pilih Ban --</option>
//             {/* {tyreSizes.map((size) => (
//               <option key={size.id} value={size.id}>
//                 {size.size}
//               </option>
//             ))} */}
//           </select>
//         </div>
//         <div>
//           <label className="block font-medium mb-1">
//             Ban 4 <span className="text-red-500">*</span>
//           </label>
//           <select
//             className="w-full p-2 border rounded-md"
//             // value={tyreSizeId}
//             // onChange={(e) => setTyreSizeId(e.target.value)}
//           >
//             <option value="">-- Pilih Ban --</option>
//             {/* {tyreSizes.map((size) => (
//               <option key={size.id} value={size.id}>
//                 {size.size}
//               </option>
//             ))} */}
//           </select>
//         </div>
//         <div>
//           <label className="block font-medium mb-1">
//             Ban 5 <span className="text-red-500">*</span>
//           </label>
//           <select
//             className="w-full p-2 border rounded-md"
//             // value={tyreSizeId}
//             // onChange={(e) => setTyreSizeId(e.target.value)}
//           >
//             <option value="">-- Pilih Ban --</option>
//             {/* {tyreSizes.map((size) => (
//               <option key={size.id} value={size.id}>
//                 {size.size}
//               </option>
//             ))} */}
//           </select>
//         </div>
//         <div>
//           <label className="block font-medium mb-1">
//             Ban 6 <span className="text-red-500">*</span>
//           </label>
//           <select
//             className="w-full p-2 border rounded-md"
//             // value={tyreSizeId}
//             // onChange={(e) => setTyreSizeId(e.target.value)}
//           >
//             <option value="">-- Pilih Ban --</option>
//             {/* {tyreSizes.map((size) => (
//               <option key={size.id} value={size.id}>
//                 {size.size}
//               </option>
//             ))} */}
//           </select>
//         </div>
//         {/* Tombol Simpan */}
//         <div className="mt-8 flex justify-end">
//           <button
//             // onClick={handleSubmit}
//             className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500"
//           >
//             Tambah Unit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddUnit;

import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/apiClient";
import React, { useState, useEffect } from "react";

const AddUnit = () => {
  const [noUnit, setNoUnit] = useState("");
  const [hmunit, setHmUnit] = useState("");
  const [kmUnit, setKmUnit] = useState("");
  const [site, setSite] = useState("");
  const [lokasi, setLokasi] = useState("");

  const [selectedBans, setSelectedBans] = useState(["", "", "", "", "", ""]);
  const [siteList, setSiteList] = useState([]);
  const [banList, setBanList] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const username = capitalizeFirst(user?.name);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const data = await apiFetch("/dropdown");

        // Filter hanya ban yang siap dipakai
        const readyTyres = (data.tyre || []).filter(
          (ban) => ban.isReady && !ban.isScrap && !ban.isInstalled
        );

        setSiteList(data.site || []);
        setBanList(readyTyres);
      } catch (error) {
        console.error("Gagal fetch data dropdown:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleBanChange = (index, value) => {
    const updated = [...selectedBans];
    updated[index] = value;
    setSelectedBans(updated);
  };

  const getAvailableBans = (currentIndex) => {
    const used = selectedBans.filter((_, i) => i !== currentIndex);
    return banList.filter((ban) => !used.includes(String(ban.stockTyre.id)));
  };

  const handleSubmit = async () => {
    const dataUnit = {
      nomorUnit: noUnit,
      hmUnit: parseInt(hmunit),
      kmUnit: parseInt(kmUnit),
      siteId: parseInt(site),
      location: lokasi,
      tyreIds: selectedBans.map((id) => parseInt(id)),
    };

    try {
      // console.log(dataUnit);
      const result = await apiFetch("/unit", {
        method: "POST",
        body: JSON.stringify(dataUnit),
      });
      alert("Unit berhasil ditambahkan.");
      navigate("/home");
      // window.location.reload();
      // fetchDropdownData();
      console.log("Response: ", result);
    } catch (error) {
      console.error("Error: ", error);
      alert("Gagal menghubungi server: " + error.message);
    }
  };

  return (
    <div className="w-full bg-gray-100 p-2 rounded-md">
      {/* Header */}
      <div className="flex justify-between items-end mb-6 ml-3">
        <div>
          <p className="text-sm text-gray-500">Pages / Add Units</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">Add Units</h1>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <p className="text-lg font-semibold">Hello, {username}</p>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-gray-500 shadow-md object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#0F2741] text-white p-4 rounded-t-lg font-semibold">
        Add Units
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Form */}
        <h2 className="text-blue-600 text-lg font-bold mb-4 border-b pb-2">
          Informasi Unit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">
              Nomor Unit <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={noUnit}
              onChange={(e) => setNoUnit(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              HM Unit <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={hmunit}
              onChange={(e) => setHmUnit(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              KM Unit <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={kmUnit}
              onChange={(e) => setKmUnit(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Site <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={site}
              onChange={(e) => setSite(e.target.value)}
            >
              <option value="">-- Pilih Site --</option>
              {siteList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">
              Lokasi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
            />
          </div>
        </div>

        {/* Dropdown Ban 1-6 */}
        <div className="space-y-4 pt-5">
          <h2 className="text-blue-600 text-lg font-bold mb-4 border-b pb-2">
            Informasi Ban
          </h2>
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              <label className="block font-medium mb-1">
                Ban {index + 1} <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedBans[index]}
                onChange={(e) => handleBanChange(index, e.target.value)}
              >
                <option value="">-- Pilih Ban --</option>
                {getAvailableBans(index).map((ban) => (
                  <option key={ban.stockTyre.id} value={ban.stockTyre.id}>
                    {ban.stockTyre.serialNumber}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Tombol Simpan */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500"
          >
            Tambah Unit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUnit;
