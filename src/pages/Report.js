import React, { useState, useEffect } from "react";
import { apiFetch } from "../services/apiClient";

const Inspect = () => {
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
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [isReady, setIsReady] = useState(null);

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const username = capitalizeFirst(user?.name);

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

    const tyre = tyres.find(
      (t) => t.stockTyre?.id?.toString() === selectedTyreId
    );
    if (tyre) {
      // Cari aktivitas install dan remove terbaru
      // const installActivity =
      //   tyre.activities.find((a) => a.dateTimeInstall !== null) || {};
      // const removeActivity =
      //   tyre.activities.find((a) => a.dateTimeRemove !== null) || {};

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
        // dateTimeInstall: installActivity.dateTimeInstall
        //   ? installActivity.dateTimeInstall.substring(0, 16)
        //   : "",
        // dateTimeRemove: removeActivity.dateTimeRemove
        //   ? removeActivity.dateTimeRemove.substring(0, 16)
        //   : "",
        // hmUnit: installActivity.hmAtActivity || "",
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

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;

  //   // Kalau isInstalled berubah, clear field kondisional jika perlu
  //   if (name === "isInstalled") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: checked,
  //       // reset data kondisional saat status berubah (opsional)
  //       installedUnitId: checked ? prev.installedUnitId : "",
  //       positionUnit: checked ? prev.positionUnit : "",
  //       dateTimeInstall: checked ? prev.dateTimeInstall : "",
  //       dateTimeRemove: checked ? prev.dateTimeRemove : "",
  //       hmUnit: checked ? prev.hmUnit : "",
  //       removedPurposeId: checked ? "" : prev.removedPurposeId, // misal kalau sudah dilepas harus pilih tujuan pelepasan
  //     }));
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: type === "checkbox" ? checked : value,
  //     }));
  //   }
  // };

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
          <p className="text-sm text-gray-500">Pages / Inspect Tyres</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">Inspect Tyres</h1>
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
        Inspect Tyres
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* <h1 className="text-lg font-bold mb-6">Update Data Ban</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">
              Serial Number Ban <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedTyreId}
              onChange={(e) => setSelectedTyreId(e.target.value)}
            >
              <option value="">-- Pilih Ban --</option>
              {tyres.map((tyre) => (
                <option key={tyre.id} value={tyre.stockTyre?.id}>
                  {tyre.stockTyre?.serialNumber}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Posisi Ban</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={formData.positionUnit}
              // onChange={(e) => setLokasi(e.target.value)}
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Tread 1</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={formData.tread1}
              // onChange={(e) => setLokasi(e.target.value)}
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Tread 2</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={formData.tread2}
              // onChange={(e) => setLokasi(e.target.value)}
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium mb-1">HM Ban</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={formData.hmUnit}
              // onChange={(e) => setLokasi(e.target.value)}
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Nomor Unit</label>
            <select
              className="w-full p-2 border rounded-md"
              value={formData.installedUnitId}
              disabled
              // onChange={(e) => setNoUnit(e.target.value)}
            >
              <option value="">-- Pilih Unit --</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.nomorUnit}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Tanggal Pengerjaan</label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded-md"
              // value={lokasi}
              // onChange={(e) => setLokasi(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Ban Siap Digunakan?
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={isReady === null ? "" : isReady.toString()}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "true") setIsReady(true);
                else if (value === "false") setIsReady(false);
                else setIsReady(null);
              }}
            >
              <option value="">-- Pilih Unit --</option>
              <option value="true">YA</option>
              <option value="false">TIDAK</option>
              {/* {unitList.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.nomorUnit}
                  </option>
                ))} */}
            </select>
          </div>
        </div>
        <div className="space-y-4 pt-5">
          {isReady === false && (
            <div className="mt-4">
              <label className="block font-medium mb-1">
                Alasan Pelepasan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Masukkan alasan pelepasan"
                // onChange={(e) => setReason(e.target.value)}
              />
            </div>
          )}
          <div>
            <label className="block font-medium mb-1">Ringkasan Kejadian</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              // value={lokasi}
              // onChange={(e) => setLokasi(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Analisa</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              // value={lokasi}
              // onChange={(e) => setLokasi(e.target.value)}
            />
          </div>
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

export default Inspect;
