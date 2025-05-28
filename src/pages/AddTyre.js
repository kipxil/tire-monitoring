import React, { useState, useEffect } from "react";
import { apiFetch } from "../services/apiClient";

const AddTyre = () => {
  const [merk, setMerk] = useState("");
  const [typeBan, setTypeBan] = useState("");
  const [patternBan, setPatternBan] = useState("");
  const [otd, setOtd] = useState("");
  const [otd2, setOtd2] = useState("");
  const [hargaBan, setHargaBan] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [ukuranBan, setUkuranBan] = useState("");
  const [hmBan, setHmBan] = useState("");
  const [kmBan, setKmBan] = useState("");

  //dropdown
  const [merkList, setMerkList] = useState([]);
  const [ukuranList, setUkuranList] = useState([]);

  const user = JSON.parse(sessionStorage.getItem("user"));

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const username = capitalizeFirst(user?.name);

  // Fetch dropdown data saat component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const data = await apiFetch("/dropdown");

        // Set state dari response API
        setMerkList(data.merk || []);
        setUkuranList(data.tyreSize || []);
      } catch (error) {
        console.error("Gagal fetch data dropdown:", error);
      }
    };

    fetchDropdownData();
  }, []);

  // TODO: Tambahkan state untuk input lain jika dibutuhkan
  const handleSubmit = async () => {
    const dataBan = {
      merkId: parseInt(merk),
      serialNumber: serialNumber,
      type: typeBan,
      pattern: patternBan,
      otd1: parseInt(otd),
      otd2: parseInt(otd2),
      price: parseInt(hargaBan),
      hmTyre: parseInt(hmBan),
      kmTyre: parseInt(kmBan),
      tyreSizeId: parseInt(ukuranBan),
    };

    try {
      console.log(dataBan);
      const result = await apiFetch("/tyre", {
        method: "POST",
        body: JSON.stringify(dataBan),
      });
      alert("ban berhasil ditambahkan");
      // Debug: tampilkan data user dari server
      console.log("Response: ", result);
    } catch (error) {
      console.error("Error: ", error);
      alert("Gagal menghubungi server." + error.message);
    }
  };

  return (
    <div className="w-full bg-gray-100 p-2 rounded-md">
      {/* Header */}
      <div className="flex justify-between items-end mb-6 ml-3">
        <div>
          <p className="text-sm text-gray-500">Pages / Add Tyres</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">Add Tyres</h1>
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

      {/* Form Container */}
      <div className="bg-[#0F2741] text-white p-4 rounded-t-lg font-semibold">
        Add New Tyres
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* === Informasi Dasar Ban === */}
        {/* <h2 className="text-lg font-semibold mb-4 border-b pb-2">Informasi Dasar Ban</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">
              Serial Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Tyre Type</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={typeBan}
              onChange={(e) => setTypeBan(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Merk <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={merk}
              onChange={(e) => setMerk(e.target.value)}
            >
              <option value="">-- Select Merk --</option>
              {merkList.map((merk) => (
                <option key={merk.id} value={merk.id}>
                  {merk.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Tyre Pattern</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={patternBan}
              onChange={(e) => setPatternBan(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              OTD 1 (Original Tread)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={otd}
              onChange={(e) => setOtd(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              OTD 2 (Original Tread)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={otd2}
              onChange={(e) => setOtd2(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">HM Tyre</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={hmBan}
              onChange={(e) => setHmBan(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">KM Tyre</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={kmBan}
              onChange={(e) => setKmBan(e.target.value)}
            />
          </div>
          {/* <div>
            <label className="block font-medium mb-1">Tyre Price</label>
            <input
              type="number"
              value={hargaBan}
              onChange={(e) => setHargaBan(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Contoh: 1500000"
            />
          </div> */}
          <div>
            <label className="block font-medium mb-1">Tyre Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                Rp.
              </span>
              <input
                type="number"
                value={hargaBan}
                onChange={(e) => setHargaBan(e.target.value)}
                className="w-full p-2 pl-10 border rounded-md"
                placeholder="Contoh: 1500000"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">
              Tyre Size <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={ukuranBan}
              onChange={(e) => setUkuranBan(e.target.value)}
            >
              <option value="">-- Select Tyre Size --</option>
              {ukuranList.map((ukuran) => (
                <option key={ukuran.id} value={ukuran.id}>
                  {ukuran.size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tombol Simpan */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500"
          >
            Add Tyre
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTyre;
