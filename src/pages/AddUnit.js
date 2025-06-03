// import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/apiClient";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import userLogo from "../assets/logo user.png";

const AddUnit = () => {
  const [noUnit, setNoUnit] = useState("");
  const [hmunit, setHmUnit] = useState("");
  const [kmUnit, setKmUnit] = useState("");
  const [site, setSite] = useState("");
  const [dateTime, setDateTime] = useState("");

  const [selectedBans, setSelectedBans] = useState([]);
  const [siteList, setSiteList] = useState([]);
  const [amountTyre, setAmountTyreList] = useState([]);
  const [banList, setBanList] = useState([]);
  const [tireCount, setTireCount] = useState("");
  const [selectedTires, setSelectedTires] = useState([]);
  const [allReadyTyres, setAllReadyTyres] = useState([]);

  // const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const username = capitalizeFirst(user?.name);

  const fetchDropdownData = async () => {
    try {
      const data = await apiFetch("/dropdown");

      const readyTyres = (data.tyre || []).filter(
        (ban) => ban.isReady && !ban.isScrap && !ban.isInstalled
      );

      setAllReadyTyres(readyTyres); // Simpan semua ban ready
      setSiteList(data.site || []);
      setAmountTyreList(data.unitTyreAmount || []);
    } catch (error) {
      console.error("Gagal fetch data dropdown:", error);
    }
  };
  useEffect(() => {
    if (site) {
      const filtered = allReadyTyres.filter(
        (ban) => String(ban.siteId) === String(site)
      );
      setBanList(filtered);
    } else {
      setBanList([]);
    }

    // Reset selected bans saat ganti site
    setSelectedBans([]);
  }, [site, allReadyTyres]);

  useEffect(() => {
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

  const handleTireCountChange = (e) => {
    const selectedId = e.target.value;

    if (!selectedId) {
      setTireCount("");
      setSelectedTires([]);
      return;
    }

    const selected = amountTyre.find(
      (item) => item.id.toString() === selectedId
    );

    if (!selected) {
      setTireCount("");
      setSelectedTires([]);
      return;
    }

    setTireCount(selectedId);
    setSelectedTires(Array(selected.amount).fill(""));
  };

  const handleSubmit = async () => {
    if (
      !noUnit ||
      !hmunit ||
      !site ||
      !dateTime ||
      !tireCount ||
      selectedBans.length !== selectedTires.length ||
      selectedBans.some((ban) => !ban)
    ) {
      toast.error("Mohon isi semua field yang wajib.");
      return;
    }
    const dataUnit = {
      nomorUnit: noUnit,
      hmUnit: parseInt(hmunit),
      kmUnit: parseInt(kmUnit),
      siteId: parseInt(site),
      unitTyreAmountId: parseInt(tireCount),
      tyreIds: selectedBans.map((id) => parseInt(id)),
      dateTimeDone: dateTime,
    };

    try {
      console.log(dataUnit);
      const result = await apiFetch("/unit", {
        method: "POST",
        body: JSON.stringify(dataUnit),
      });
      toast.success("Unit berhasil ditambahkan.");
      await fetchDropdownData();
      setNoUnit("");
      setHmUnit("");
      setKmUnit("");
      setSite("");
      setTireCount("");
      setDateTime("");
      console.log("Response: ", result);
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Gagal menghubungi server");
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
            src={userLogo}
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
          Unit Information
        </h2>
        <div className="space-y-4 pb-4">
          <div>
            <label className="block font-medium mb-1">
              Unit Number <span className="text-red-500">*</span>
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
            <label className="block font-medium mb-1">KM Unit</label>
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
              <option value="">-- Select Site --</option>
              {siteList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">
              Time Created <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded-md"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Total Tyre <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={tireCount}
              onChange={handleTireCountChange}
            >
              <option value="">-- Pilih Jumlah Ban --</option>
              {amountTyre.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.amount}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dropdown untuk Ban yang Akan Dipasang */}
        {selectedTires.length > 0 && (
          <div>
            <h2 className="text-blue-600 text-lg font-bold mb-4 border-b pb-2">
              Tyre Information
            </h2>
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedTires.map((value, index) => (
                <div key={index}>
                  <label className="block font-medium mb-1">
                    Tyre {index + 1}
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
          </div>
        )}

        {/* Dropdown Ban 1-6 */}
        {/* <div className="space-y-4 pt-5">
          <h2 className="text-blue-600 text-lg font-bold mb-4 border-b pb-2">
            Tyre Information
          </h2>
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              <label className="block font-medium mb-1">
                Tyre {index + 1} <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedBans[index]}
                onChange={(e) => handleBanChange(index, e.target.value)}
              >
                <option value="">-- Select Tyre --</option>
                {getAvailableBans(index).map((ban) => (
                  <option key={ban.stockTyre.id} value={ban.stockTyre.id}>
                    {ban.stockTyre.serialNumber}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div> */}

        {/* Tombol Simpan */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500"
          >
            Add Unit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUnit;
