import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "../services/apiClient";
import userLogo from "../assets/logo user.png";

const EditUnit = () => {
  const [selectedUnitId, setselectedUnitId] = useState("");
  const [unitNumber, setunitNumber] = useState("");
  const [hmUnit, sethmUnit] = useState("");
  const [kmUnit, setKmUnit] = useState("");
  const [siteId, setSiteId] = useState("");

  const [unitList, setunitList] = useState([]);
  const [siteList, setsiteList] = useState([]);

  const user = JSON.parse(sessionStorage.getItem("user"));

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const username = capitalizeFirst(user?.name);

  const fetchUnit = async () => {
    try {
      const response = await apiFetch("/unit"); // Ganti sesuai endpoint
      setunitList(response.data);

      const dropdown = await apiFetch("/dropdown");
      // Generate unique merk list
      const site = dropdown.site.map((m) => ({ id: m.id, name: m.name }));
      setsiteList(site);

      // Generate unique tyre sizes
      // const sizes = [...new Set(dropdown.tyreSize.map((t) => t.size))];
      // const sizes = dropdown.tyreSize.map((s) => ({
      //   id: s.id,
      //   size: s.size,
      // }));
      // setUkuranList(sizes);
    } catch (error) {
      console.error("Gagal mengambil data ban:", error);
    }
  };

  // Di dalam useEffect
  useEffect(() => {
    fetchUnit();
  }, []);

  useEffect(() => {
    if (selectedUnitId) {
      const selected = unitList.find(
        (unit) => unit.id === parseInt(selectedUnitId)
      );
      if (selected) {
        setunitNumber(selected.nomorUnit || "");
        sethmUnit(selected.hmUnit ?? 0);
        setKmUnit(selected.kmUnit ?? 0);
        setSiteId(selected.siteId || "");
      }
    } else {
      // Kosongkan jika tidak dipilih
      setunitNumber("");
      sethmUnit("");
      setKmUnit("");
      setSiteId("");
    }
  }, [selectedUnitId, unitList]);

  const handleSubmit = async () => {
    if (!selectedUnitId) {
      toast.error("Mohon isi semua field yang wajib.");
      return;
    }
    try {
      const payload = {
        nomorUnit: unitNumber,
        hmUnit: parseInt(hmUnit),
        kmUnit: parseInt(kmUnit),
        siteId: parseInt(siteId),
      };
      console.log(payload);
      await apiFetch(`/unit/${selectedUnitId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      // alert("Data ban berhasil diperbarui!");
      toast.success("Data Unit berhasil diperbarui!");
      await fetchUnit();
      setselectedUnitId("");
      setunitNumber("");
      sethmUnit("");
      setKmUnit("");
      setSiteId("");
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      toast.error("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="w-full bg-gray-100 p-2 rounded-md">
      {/* Header */}
      <div className="flex justify-between items-end mb-6 ml-3">
        <div>
          <p className="text-sm text-gray-500">Pages / Edit Unit</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">Edit Unit</h1>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <p className="text-lg font-semibold">Hello, {username}</p>
          <img
            src={userLogo}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-gray-500 shadow-md object-cover"
          />
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-[#0F2741] text-white p-4 rounded-t-lg font-semibold">
        Edit Unit
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* === Informasi Dasar Ban === */}
        {/* <h2 className="text-lg font-semibold mb-4 border-b pb-2">Informasi Dasar Ban</h2> */}
        <div className="space-y-4 pb-4">
          <div>
            <label className="block font-medium mb-1">
              Select Unit <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedUnitId}
              onChange={(e) => setselectedUnitId(e.target.value)}
            >
              <option value="">-- Select Unit --</option>
              {unitList.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.nomorUnit}
                </option>
              ))}
            </select>
          </div>
          <h2 className="text-blue-600 text-lg font-bold mb-4 border-b pb-2">
            Edit Unit
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Unit Number</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={unitNumber}
              onChange={(e) => setunitNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">HM Unit</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={hmUnit}
              onChange={(e) => sethmUnit(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">KM Unit</label>
            <input
              type="text"
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
              value={siteId}
              onChange={(e) => setSiteId(e.target.value)}
            >
              <option value="">-- Select Site --</option>
              {siteList.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
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
            Edit Unit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUnit;
