import React, { useState, useEffect } from "react";
import { apiFetch } from "../services/apiClient";

const EditTyre = () => {
  const [selectedTyreId, setSelectedTyreId] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [typeBan, setTypeBan] = useState("");
  const [merk, setMerk] = useState("");
  const [patternBan, setPatternBan] = useState("");
  const [otd, setOtd] = useState("");
  const [otd2, setOtd2] = useState("");
  const [hmBan, setHmBan] = useState("");
  const [kmBan, setKmBan] = useState("");
  const [hargaBan, setHargaBan] = useState("");
  const [ukuranBan, setUkuranBan] = useState("");

  const [tyreList, setTyreList] = useState([]);
  const [merkList, setMerkList] = useState([]);
  const [ukuranList, setUkuranList] = useState([]);

  const user = JSON.parse(sessionStorage.getItem("user"));

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const username = capitalizeFirst(user?.name);

  useEffect(() => {
    const fetchTyres = async () => {
      try {
        const response = await apiFetch("/tyre"); // Ganti sesuai endpoint
        setTyreList(response.data);

        const dropdown = await apiFetch("/dropdown");
        // Generate unique merk list
        // const merks = [...new Set(dropdown.merk.map((t) => t.name))];
        const merks = dropdown.merk.map((m) => ({ id: m.id, name: m.name }));
        setMerkList(merks);

        // Generate unique tyre sizes
        // const sizes = [...new Set(dropdown.tyreSize.map((t) => t.size))];
        const sizes = dropdown.tyreSize.map((s) => ({
          id: s.id,
          size: s.size,
        }));
        setUkuranList(sizes);
      } catch (error) {
        console.error("Gagal mengambil data ban:", error);
      }
    };

    fetchTyres();
  }, []);

  useEffect(() => {
    if (selectedTyreId) {
      const selected = tyreList.find(
        (tyre) => tyre.id === parseInt(selectedTyreId)
      );
      if (selected) {
        setSerialNumber(selected.stockTyre.serialNumber || "");
        setTypeBan(selected.type || "Tidak Ada");
        setMerk(selected.stockTyre.merk?.id || "");
        setPatternBan(selected.pattern || "Tidak Ada");
        setOtd(selected.tread1 ?? 0);
        setOtd2(selected.tread2 ?? 0);
        setHmBan(selected.hmTyre ?? 0);
        setKmBan(selected.kmTyre ?? 0);
        setHargaBan(selected.price ?? 0);
        setUkuranBan(selected.stockTyre.tyreSize?.id || "");
      }
    } else {
      // Kosongkan jika tidak dipilih
      setSerialNumber("");
      setTypeBan("");
      setMerk("");
      setPatternBan("");
      setOtd("");
      setOtd2("");
      setHmBan("");
      setKmBan("");
      setHargaBan("");
      setUkuranBan("");
    }
  }, [selectedTyreId, tyreList]);

  const handleSubmit = async () => {
    try {
      const payload = {
        serialNumber,
        type: typeBan,
        pattern: patternBan,
        tread1: parseFloat(otd),
        tread2: parseFloat(otd2),
        hmTyre: parseFloat(hmBan),
        kmTyre: parseFloat(kmBan),
        price: parseFloat(hargaBan),
        // stockTyre: {
        //   merk: { id: merk },
        //   tyreSize: { id: ukuranBan },
        // },
        merk: merk,
        tyreSize: ukuranBan,
      };
      console.log(payload);
      await apiFetch(`/tyre/${selectedTyreId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      alert("Data ban berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="w-full bg-gray-100 p-2 rounded-md">
      {/* Header */}
      <div className="flex justify-between items-end mb-6 ml-3">
        <div>
          <p className="text-sm text-gray-500">Pages / Edit Tyres</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">Edit Tyres</h1>
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
        Edit Tyres
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* === Informasi Dasar Ban === */}
        {/* <h2 className="text-lg font-semibold mb-4 border-b pb-2">Informasi Dasar Ban</h2> */}
        <div className="space-y-4 pb-4">
          <div>
            <label className="block font-medium mb-1">
              Select Tyre <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedTyreId}
              onChange={(e) => setSelectedTyreId(e.target.value)}
            >
              <option value="">-- Select Tyre --</option>
              {tyreList.map((tyre) => (
                <option key={tyre.id} value={tyre.id}>
                  {tyre.stockTyre.serialNumber}
                </option>
              ))}
            </select>
          </div>
          <h2 className="text-blue-600 text-lg font-bold mb-4 border-b pb-2">
            Edit Tyre
          </h2>
        </div>
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
              {merkList.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
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
              {ukuranList.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.size}
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

export default EditTyre;
