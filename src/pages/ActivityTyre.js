import { apiFetch } from "../services/apiClient";
import React, { useState, useEffect } from "react";
import userLogo from "../assets/logo user.png";

const UpdateTyre = () => {
  const [noUnit, setNoUnit] = useState("");
  const [lokasiLepas, setLokasiLepas] = useState("");
  const [Hm, setHm] = useState("");
  const [Km, setKm] = useState("");
  const [treadLepas1, setTreadLepas1] = useState("");
  const [treadLepas2, setTreadLepas2] = useState("");
  const [serialNumberLepas, setSerialNumberLepas] = useState("");
  const [alasanLepas, setAlasanLepas] = useState("");
  const [tujuanLepas, setTujuanLepas] = useState("");
  const [serialNumberPasang, setSerialNumberPasang] = useState("");
  const [manPower, setManPower] = useState("");
  const [treadPasang1, setTreadPasang1] = useState("");
  const [treadPasang2, setTreadPasang2] = useState("");
  const [airCondition, setAirCondition] = useState("");
  const [psi, setPsi] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const [unitList, setunitList] = useState([]);
  const [serialNumberLepasList, setSerialNumberLepasList] = useState([]);
  const [serialNumberLepasMaster, setSerialNumberLepasMaster] = useState([]);
  const [alasanLepasList, setAlasanLepasList] = useState([]);
  const [tujuanLepasList, setTujuanLepasList] = useState([]);
  const [serialNumberPasangList, setSerialNumberPasangList] = useState([]);
  const [airConditionList, setAirConditionList] = useState([]);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const username = capitalizeFirst(user?.name);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const data = await apiFetch("/dropdown");

        const banReady = (data.tyre || []).filter(
          (ready) => !ready.isReady && !ready.isScrap && ready.isInstalled
        );

        const banNotReady = (data.tyre || []).filter(
          (ready) => ready.isReady && !ready.isScrap && !ready.isInstalled
        );

        setunitList(data.unit || []);
        setSerialNumberLepasList(banReady);
        setSerialNumberLepasMaster(banReady);
        setAlasanLepasList(data.removeReason || []);
        setTujuanLepasList(data.removePurpose || []);
        setSerialNumberPasangList(banNotReady);
        setAirConditionList(data.airCondition || []);
      } catch (error) {
        console.error("Gagal fetch data dropdown:", error);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (!noUnit) return;
    const filtered = serialNumberLepasMaster.filter(
      (ban) => ban.installedUnitId?.toString() === noUnit
    );
    setSerialNumberLepasList(filtered);
  }, [noUnit, serialNumberLepasMaster]);

  const handleSubmit = async () => {
    if (
      !noUnit ||
      !Hm ||
      !Km ||
      !treadLepas1 ||
      !treadLepas2 ||
      !serialNumberLepas ||
      !tujuanLepas ||
      !alasanLepas ||
      !serialNumberPasang ||
      !dateStart ||
      !dateEnd
    ) {
      alert("Mohon isi semua field yang wajib.");
      return;
    }
    const dataActivity = {
      unitId: parseInt(noUnit),
      hmAtActivity: parseInt(Hm),
      kmAtActivity: parseInt(Km),
      location: lokasiLepas,
      removedTyreId: parseInt(serialNumberLepas),
      removeReasonId: alasanLepas,
      removePurposeId: parseInt(tujuanLepas),
      installedTyreId: parseInt(serialNumberPasang),
      airConditionId: parseInt(airCondition),
      airPressure: parseInt(psi),
      manpower: manPower,
      dateTimeWork: dateStart,
      dateTimeDone: dateEnd,
      tread1Remove: parseInt(treadLepas1),
      tread2Remove: parseInt(treadLepas2),
      tread1Install: parseInt(treadPasang1),
      tread2Install: parseInt(treadPasang2),
    };

    try {
      console.log(dataActivity);
      const result = await apiFetch("/activity", {
        method: "POST",
        body: JSON.stringify(dataActivity),
      });
      alert("Activity berhasil.");
      // setNoUnit("");
      // setHm("");
      // setKm("");
      // setLokasiLepas("");
      // setSerialNumberLepas("");
      // setAlasanLepas("");
      // setTujuanLepas("");
      // setSerialNumberPasang("");
      // setAirCondition("");
      // setPsi("");
      // setManPower("");
      // setDateStart("");
      // setDateEnd("");
      // setTreadLepas1("");
      // setTreadLepas2("");
      // setTreadPasang1("");
      // setTreadPasang2("");
      // navigate("/home");
      window.location.reload();
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
          <p className="text-sm text-gray-500">Pages / Activity Tyres</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">Activity Tyres</h1>
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
        Activity Tyres
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Form Pelepasan */}
        <div className="space-y-4 pt-1">
          <h2 className="text-lg font-bold text-red-600">Remove Tyre</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">
                Unit <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={noUnit}
                onChange={(e) => setNoUnit(e.target.value)}
              >
                <option value="">-- Select Unit --</option>
                {unitList.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.nomorUnit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Location Unit</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={lokasiLepas}
                onChange={(e) => setLokasiLepas(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                HM Unit <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={Hm}
                onChange={(e) => setHm(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                KM Unit <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={Km}
                onChange={(e) => setKm(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Removed Tyre <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={serialNumberLepas}
                onChange={(e) => setSerialNumberLepas(e.target.value)}
              >
                <option value="">-- Select Tyre --</option>
                {serialNumberLepasList.map((lepas) => (
                  <option key={lepas.stockTyre.id} value={lepas.stockTyre.id}>
                    {lepas.stockTyre.serialNumber}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Tread 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={treadLepas1}
                onChange={(e) => setTreadLepas1(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Tread 2 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={treadLepas2}
                onChange={(e) => setTreadLepas2(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Remove reason <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={alasanLepas}
                onChange={(e) => setAlasanLepas(e.target.value)}
              >
                <option value="">-- Select Reason --</option>
                {alasanLepasList.map((banl) => (
                  <option key={banl.id} value={banl.id}>
                    {banl.description}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Remove Purpose <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={tujuanLepas}
                onChange={(e) => setTujuanLepas(e.target.value)}
              >
                <option value="">-- Select Purpose --</option>
                {tujuanLepasList.map((tlepas) => (
                  <option key={tlepas.id} value={tlepas.id}>
                    {tlepas.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Form Pemasangan */}
        <div className="space-y-4 pt-5">
          <h2 className="text-lg font-bold text-blue-600">Install Tyre</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">
                Install Tyre <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={serialNumberPasang}
                onChange={(e) => setSerialNumberPasang(e.target.value)}
              >
                <option value="">-- Select Tyre --</option>
                {serialNumberPasangList.map((pasang) => (
                  <option key={pasang.stockTyre.id} value={pasang.stockTyre.id}>
                    {pasang.stockTyre.serialNumber}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Man Power</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={manPower}
                onChange={(e) => setManPower(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Tread 1</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={treadPasang1}
                onChange={(e) => setTreadPasang1(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Tread 2</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={treadPasang2}
                onChange={(e) => setTreadPasang2(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Air Condition</label>
              <select
                className="w-full p-2 border rounded-md"
                value={airCondition}
                onChange={(e) => setAirCondition(e.target.value)}
              >
                <option>-- Select Condition --</option>
                {airConditionList.map((ac) => (
                  <option key={ac.id} value={ac.id}>
                    {ac.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Pressure (PSI)</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={psi}
                onChange={(e) => setPsi(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Time Installation (Start){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-md"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Time Installation (Finish){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-md"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tombol Simpan */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500"
          >
            Add Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTyre;
