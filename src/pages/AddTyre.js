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

  //dropdown
  const [merkList, setMerkList] = useState([]);
  const [ukuranList, setUkuranList] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

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

  // const handleUnitChange = (e) => {
  //   const selectedId = e.target.value;
  //   setUnitId(selectedId);

  //   const selectedUnit = unitIdDrop.find((u) => u.id === parseInt(selectedId));
  //   if (selectedUnit) {
  //     const usedPositions = selectedUnit.tyre
  //       .filter((t) => t.isInstalled)
  //       .map((t) => t.positionTyre);

  //     const allPositions = [1, 2, 3, 4, 5, 6];
  //     const available = allPositions.filter((pos) => !usedPositions.includes(pos));

  //     setAvailablePositions(available);
  //     // setLocation(selectedUnit.location || "");
  //     // setSiteId(selectedUnit.siteId || "");
  //     // setHmunit(selectedUnit.hmUnit || "");
  //   } else {
  //     setAvailablePositions([]);
  //   }
  // };

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
      tyreSizeId: parseInt(ukuranBan),
    };

    try {
      console.log(dataBan);
      const result = await apiFetch("/tyre", {
        method: "POST",
        body: JSON.stringify(dataBan),
      });
      alert(result);
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
              Merk Ban <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={merk}
              onChange={(e) => setMerk(e.target.value)}
            >
              <option value="">-- Pilih Merk --</option>
              {merkList.map((merk) => (
                <option key={merk.id} value={merk.id}>
                  {merk.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">
              Type Ban <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={typeBan}
              onChange={(e) => setTypeBan(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Pattern Ban <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={patternBan}
              onChange={(e) => setPatternBan(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              OTD 1 (Original Tread) <span className="text-red-500">*</span>
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
              OTD 2 (Original Tread) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={otd2}
              onChange={(e) => setOtd2(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Harga Ban <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={hargaBan}
              onChange={(e) => setHargaBan(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Contoh: 150000"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Serial Number Ban <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Ukuran Ban <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={ukuranBan}
              onChange={(e) => setUkuranBan(e.target.value)}
            >
              <option value="">-- Pilih Ukuran Ban --</option>
              {ukuranList.map((ukuran) => (
                <option key={ukuran.id} value={ukuran.id}>
                  {ukuran.size}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="col-span-2">
            <label className="block font-medium mb-1">
              Status Instalasi <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="instalasi"
                  value="true"
                  checked={installationStatus === true}
                  onChange={() => setInstallationStatus(true)}
                  className="mr-2"
                />
                Terpasang
                <span className="text-sm text-gray-500 ml-1">(Wajib isi unit kendaraan dan posisi)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="instalasi"
                  value="false"
                  checked={installationStatus === false}
                  onChange={() => setInstallationStatus(false)}
                  className="mr-2"
                />
                Tidak Terpasang
              </label>
            </div>
          </div> */}
        </div>

        {/* === Informasi Tambahan Ban === */}
        {/* <h2 className="text-lg font-semibold my-6 border-b pb-2">Informasi Tambahan Ban (Opsional)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Merk Ban</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={merk}
              onChange={(e) => setMerk(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Petugas Pemasang</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={manPower}
              onChange={(e) => setManPower(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Kedalaman Telapak 1 (mm)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={tread1}
              onChange={(e) => setTread1(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Kedalaman Telapak 2 (mm)</label>
            <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={tread2}
            onChange={(e) => setTread2(e.target.value)}
          />
          </div>
        </div> */}

        {/* === Kondisional berdasarkan status instalasi === */}
        {/* {installationStatus ? ( */}
        {/* <>
            <h2 className="text-lg font-semibold my-6 border-b pb-2 text-red-600">
              Informasi Pemasangan Ban <span className="text-sm text-red-500">(Wajib diisi)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">
                  Unit Kendaraan <span className="text-red-500">*</span>
                </label>
                <select className="w-full p-2 border rounded-md" value={unitId}>
                  <option value="">-- Pilih Unit Kendaraan --</option>
                  {unitIdDrop.map((udrop) => (
                    <option key={udrop.id} value={udrop.id}>
                      {udrop.nomorUnit}
                    </option>
                  ))}

                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Site Unit<span className="text-red-500">*</span>
                </label>
                <select className="w-full p-2 border rounded-md" value={siteId} onChange={(e) => setSiteId(e.target.value)}>
                  <option value="">-- Pilih Unit Kendaraan --</option>
                  {siteDrop.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.name}
                    </option>
                  ))}

                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Lokasi<span className="text-red-500">*</span>
                </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Posisi ban pada Unit <span className="text-red-500">*</span>
                </label>
                <select className="w-full p-2 border rounded-md" value={positionUnit} onChange={(e) => setPositionUnit(e.target.value)}>
                  <option value="">-- Pilih Posisi --</option>
                  {availablePositions.map((pos) => (
                    <option key={pos} value={pos}>
                      {`TYRE ${pos}`}
                    </option>
                  ))} */}
        {/* <option value="1">TYRE 1</option>
                  <option value="2">TYRE 2</option>
                  <option value="3">TYRE 3</option>
                  <option value="4">TYRE 4</option>
                  <option value="5">TYRE 5</option>
                  <option value="6">TYRE 6</option> */}
        {/* </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Tanggal & Waktu Pemasangan</label>
                <input type="datetime-local" className="w-full p-2 border rounded-md" value={dateTimeInstall} onChange={(e) => setDateTimeInstall(e.target.value)} />
              </div>
              <div>
                <label className="block font-medium mb-1">HM Unit</label>
                <input type="number" className="w-full p-2 border rounded-md" value={hmUnit} onChange={(e) => setHmunit(e.target.value)} />
              </div>
              <div>
                <label className="block font-medium mb-1">Kondisi Angin</label>
                <select className="w-full p-2 border rounded-md">
                  <option>-- Pilih Kondisi --</option>
                  {airConditions.map((cond) => (
                    <option key={cond.id} value={cond.id}>
                      {cond.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Tekanan (PSI)</label>
                <input type="number" className="w-full p-2 border rounded-md" />
              </div>
            </div>
          </> */}
        {/* ) : ( */}
        <>
          {/* <h2 className="text-lg font-semibold my-6 border-b pb-2">Informasi Pelepasan Ban</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">
                  Tujuan Pelepasan <span className="text-red-500">*</span>
                </label>
                <select className="w-full p-2 border rounded-md" value={removedPurposeId} onChange={(e) => setremovedPurposeId(e.target.value)}>
                  <option value="">-- Pilih Tujuan Pelepasan --</option>
                  {removePurposes.map((purpose) => (
                    <option key={purpose.id} value={purpose.id}>
                      {purpose.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Tanggal & Waktu Pelepasan</label>
                <input type="datetime-local" className="w-full p-2 border rounded-md" value={dateTimeRemove} onChange={(e) => setDateTimeRemove(e.target.value)} />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Alasan Pelepasan <span className="text-red-500">*</span>
                </label>
                <select className="w-full p-2 border rounded-md"  value={removeReasonId} onChange={(e) => setRemoveReasonId(e.target.value)}>
                  <option value="">-- Pilih Alasan Pelepasan --</option>
                  {removeReasons.map((remreas) => (
                    <option key={remreas.id} value={remreas.id}>
                      {remreas.description}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}
        </>
        {/* )} */}

        {/* Tombol Simpan */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500"
          >
            Tambah Ban
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTyre;
