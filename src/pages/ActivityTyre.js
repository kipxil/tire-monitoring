import { apiFetch } from "../services/apiClient";
import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
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

  const fetchDropdownData = useCallback(async () => {
    try {
      const data = await apiFetch("/dropdown");
      const user = JSON.parse(sessionStorage.getItem("user"));

      const allUnits = data.unit || [];

      const filteredUnits =
        user.roleId === 1
          ? allUnits
          : allUnits.filter((unit) => unit.site.name === user.roleUser.name);

      const banReady = (data.tyre || []).filter(
        (tyre) => !tyre.isReady && !tyre.isScrap && tyre.isInstalled
      );

      const banNotReady = (data.tyre || []).filter(
        (tyre) =>
          tyre.isReady &&
          !tyre.isScrap &&
          !tyre.isInstalled &&
          filteredUnits.some((unit) => unit.siteId === tyre.siteId)
      );

      setunitList(filteredUnits);
      setSerialNumberLepasList(banReady);
      setSerialNumberLepasMaster(banReady);
      setAlasanLepasList(data.removeReason || []);
      setTujuanLepasList(data.removePurpose || []);
      setSerialNumberPasangList(banNotReady);
      setAirConditionList(data.airCondition || []);
    } catch (error) {
      console.error("Gagal fetch data dropdown:", error);
    }
  }, []); // Kosong karena tidak ada state/props dari luar

  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  useEffect(() => {
    if (!noUnit) {
      setSerialNumberLepasList([]);
      setLokasiLepas("");
      setHm("");
      setKm("");
      return;
    }

    const unit = unitList.find((u) => u.id.toString() === noUnit);
    if (!unit) return;

    // Ambil semua stockTyreId dari ban yang sedang terpasang di unit
    const installedStockTyreIds = unit.tyres.map((t) => t.tyre?.stockTyreId);

    // Filter ban di master list yang id-nya cocok
    const filtered = serialNumberLepasMaster.filter((ban) =>
      installedStockTyreIds.includes(ban.stockTyre.id)
    );

    setSerialNumberLepasList(filtered);

    setHm(unit.hmUnit?.toString() || "");
    setKm(unit.kmUnit?.toString() || "");
    setLokasiLepas(unit.location || "");
  }, [noUnit, unitList, serialNumberLepasMaster]);

  const alasanOptions = alasanLepasList.map((item) => ({
    value: item.id,
    label: item.description,
  }));

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
      toast.error("Mohon isi semua field yang wajib.");
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
      toast.success("Activity berhasil.");
      await fetchDropdownData();
      setNoUnit("");
      setHm("");
      setKm("");
      setLokasiLepas("");
      setSerialNumberLepas("");
      setAlasanLepas("");
      setTujuanLepas("");
      setSerialNumberPasang("");
      setAirCondition("");
      setPsi("");
      setManPower("");
      setDateStart("");
      setDateEnd("");
      setTreadLepas1("");
      setTreadLepas2("");
      setTreadPasang1("");
      setTreadPasang2("");
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
              <Select
                options={unitList.map((unit) => ({
                  value: unit.id,
                  label: unit.nomorUnit,
                }))}
                value={
                  unitList
                    .map((unit) => ({
                      value: unit.id,
                      label: unit.nomorUnit,
                    }))
                    .find((option) => option.value === parseInt(noUnit)) || null
                }
                onChange={(selected) =>
                  setNoUnit(selected ? selected.value.toString() : "")
                }
                placeholder="-- Select Unit --"
                isClearable
                className="w-full"
              />
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
              <Select
                options={serialNumberLepasList.map((lepas) => ({
                  value: lepas.id,
                  label: lepas.stockTyre.serialNumber,
                }))}
                value={
                  serialNumberLepasList
                    .map((lepas) => ({
                      value: lepas.id,
                      label: lepas.stockTyre.serialNumber,
                    }))
                    .find((opt) => opt.value === parseInt(serialNumberLepas)) ||
                  null
                }
                onChange={(selected) =>
                  setSerialNumberLepas(
                    selected ? selected.value.toString() : ""
                  )
                }
                placeholder="-- Select Tyre --"
                isClearable
                className="w-full"
              />
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
              <Select
                className="w-full"
                options={alasanLepasList.map((item) => ({
                  value: item.id,
                  label: item.description,
                }))}
                value={
                  alasanLepasList
                    .map((item) => ({
                      value: item.id,
                      label: item.description,
                    }))
                    .find((option) => option.value === alasanLepas) || null
                }
                onChange={(selected) =>
                  setAlasanLepas(selected ? selected.value : "")
                }
                placeholder="-- Select Reason --"
                isClearable
              />
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
              <Select
                options={serialNumberPasangList.map((pasang) => ({
                  value: pasang.stockTyre.id,
                  label: pasang.stockTyre.serialNumber,
                }))}
                value={
                  serialNumberPasangList
                    .map((pasang) => ({
                      value: pasang.stockTyre.id,
                      label: pasang.stockTyre.serialNumber,
                    }))
                    .find(
                      (opt) => opt.value === parseInt(serialNumberPasang)
                    ) || null
                }
                onChange={(selectedOption) =>
                  setSerialNumberPasang(selectedOption?.value || "")
                }
                placeholder="-- Select Tyre --"
                isClearable
              />
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
