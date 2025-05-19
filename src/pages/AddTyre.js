import React, { useState } from "react";

const AddTyre = () => {
  const [installationStatus, setInstallationStatus] = useState("tidak");

  // TODO: Tambahkan state untuk input lain jika dibutuhkan
  const handleSubmit = () => {
    const dataBan = {
      nomorSeri: "", // Tambahkan nilai dari input terkait
      ukuran: "",
      status: installationStatus,
    };

    console.log("Data Ban Tersimpan:", dataBan);
    alert("Data Ban berhasil disimpan (simulasi)");
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
          <p className="text-lg font-semibold">Hello, Admin</p>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-gray-500 shadow-md object-cover"
          />
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-[#0F2741] text-white p-4 rounded-t-lg font-semibold">Add New Tyres</div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* === Informasi Dasar Ban === */}
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Informasi Dasar Ban</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">
              Nomor Seri Ban <span className="text-red-500">*</span>
            </label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Ukuran Ban <span className="text-red-500">*</span>
            </label>
            <select className="w-full p-2 border rounded-md">
              <option>-- Pilih Ukuran Ban --</option>
              <option>Ukuran Test</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block font-medium mb-1">
              Status Instalasi <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="instalasi"
                  value="terpasang"
                  checked={installationStatus === "terpasang"}
                  onChange={() => setInstallationStatus("terpasang")}
                  className="mr-2"
                />
                Terpasang
                <span className="text-sm text-gray-500 ml-1">(Wajib isi unit kendaraan dan posisi)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="instalasi"
                  value="tidak"
                  checked={installationStatus === "tidak"}
                  onChange={() => setInstallationStatus("tidak")}
                  className="mr-2"
                />
                Tidak Terpasang
              </label>
            </div>
          </div>
        </div>

        {/* === Informasi Tambahan Ban === */}
        <h2 className="text-lg font-semibold my-6 border-b pb-2">Informasi Tambahan Ban (Opsional)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Merk Ban</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Kedalaman Telapak 1 (mm)</label>
            <input type="number" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Kedalaman Telapak 2 (mm)</label>
            <input type="number" className="w-full p-2 border rounded-md" />
          </div>
        </div>

        {/* === Kondisional berdasarkan status instalasi === */}
        {installationStatus === "terpasang" ? (
          <>
            <h2 className="text-lg font-semibold my-6 border-b pb-2 text-red-600">
              Informasi Pemasangan Ban <span className="text-sm text-red-500">(Wajib diisi)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">
                  Unit Kendaraan <span className="text-red-500">*</span>
                </label>
                <select className="w-full p-2 border rounded-md">
                  <option>-- Pilih Unit Kendaraan --</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Posisi pada Unit <span className="text-red-500">*</span>
                </label>
                <select className="w-full p-2 border rounded-md">
                  <option>-- Pilih Posisi --</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Tanggal & Waktu Pemasangan</label>
                <input type="datetime-local" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block font-medium mb-1">Kondisi Angin</label>
                <select className="w-full p-2 border rounded-md">
                  <option>-- Pilih Kondisi --</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Petugas Pemasang</label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block font-medium mb-1">Tekanan (PSI)</label>
                <input type="number" className="w-full p-2 border rounded-md" />
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold my-6 border-b pb-2">Informasi Pelepasan Ban</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">
                  Tujuan Pelepasan <span className="text-red-500">*</span>
                </label>
                <select className="w-full p-2 border rounded-md">
                  <option>-- Pilih Tujuan Pelepasan --</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block font-medium mb-1">Alasan Pelepasan</label>
                <textarea className="w-full p-2 border rounded-md" rows="3" />
              </div>
            </div>
          </>
        )}

        {/* Tombol Simpan */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500"
          >
            Simpan Data Ban
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTyre;
