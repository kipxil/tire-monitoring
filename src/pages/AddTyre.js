import React, { useState } from "react";

// bg-[#f7f9fc]
const AddTyre = () => {
    const [installationStatus, setInstallationStatus] = useState("tidak"); // 'terpasang' atau 'tidak'
    
    const handleSubmit = () => {
        // Simulasi data yang bisa kamu kembangkan lebih lanjut
        const dataBan = {
            nomorSeri: "", // isi dari input nomor seri
            ukuran: "",    // isi dari select ukuran
            status: installationStatus,
            // dst ... kamu bisa tambah semua data dari form sesuai kebutuhan
        };

        console.log("Data Ban Tersimpan:", dataBan);

        // TODO: Kirim ke database melalui API misalnya dengan fetch / axios
        alert("Data Ban berhasil disimpan (simulasi)");
    };

    
    return (
      <div className="w-full bg-gray-100 p-2 rounded-md shadow-none">
        {/* Header */}
        <div className="flex items-ends justify-between mb-6 ml-3">
        {/* Breadcrumb & Title */}
        <div>
          <p className="text-sm text-gray-500">Pages / Add Tyres</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">Add Tyres</h1>
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
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Informasi Dasar Ban</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nomor Seri */}
        <div>
          <label className="block mb-1 font-medium">Nomor Seri Ban <span className="text-red-500">*</span></label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        
        {/* Ukuran */}
        <div>
          <label className="block mb-1 font-medium">Ukuran Ban <span className="text-red-500">*</span></label>
          <select className="w-full p-2 border border-gray-300 rounded-md">
            <option>-- Pilih Ukuran Ban --</option>
            <option>Ukuran Test</option>
          </select>
        </div>

        {/* Status Instalasi */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Status Instalasi <span className="text-red-500">*</span></label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center">
              <input
                type="radio"
                name="instalasi"
                value="terpasang"
                className="mr-2"
                checked={installationStatus === "terpasang"}
                onChange={() => setInstallationStatus("terpasang")}
              />
              Terpasang <span className="text-sm text-gray-500 ml-1">(Wajib isi unit kendaraan dan posisi)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="instalasi"
                value="tidak"
                className="mr-2"
                checked={installationStatus === "tidak"}
                onChange={() => setInstallationStatus("tidak")}
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
          <label className="block mb-1 font-medium">Merk Ban</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Kedalaman Telapak 1 (mm)</label>
          <input type="number" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Kedalaman Telapak 2 (mm)</label>
          <input type="number" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
      </div>

      {/* === Conditional Section === */}
      {installationStatus === "terpasang" ? (
        <>
          <h2 className="text-lg font-semibold my-6 border-b pb-2 text-red-600">
            Informasi Pemasangan Ban <span className="text-sm text-red-500">(Wajib diisi jika ban terpasang)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Unit Kendaraan (Wajib) <span className="text-red-500">*</span></label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>-- Pilih Unit Kendaraan --</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Posisi pada Unit (Wajib) <span className="text-red-500">*</span></label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>-- Pilih Posisi --</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Tanggal & Waktu Pemasangan</label>
              <input type="datetime-local" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Kondisi Angin</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>-- Pilih Kondisi --</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Petugas Pemasang</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Tekanan (PSI)</label>
              <input type="number" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold my-6 border-b pb-2">Informasi Pelepasan Ban</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Tujuan Pelepasan <span className="text-red-500">*</span></label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>-- Pilih Tujuan Pelepasan --</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Alasan Pelepasan</label>
              <textarea className="w-full p-2 border border-gray-300 rounded-md" rows="3" />
            </div>
          </div>
        </>
      )}
      <div className="mt-8 flex justify-end">
  <button
    onClick={() => handleSubmit()}
    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
  >
    Simpan Data Ban
  </button>
</div>
    </div>
    </div>
  );
};

export default AddTyre;
