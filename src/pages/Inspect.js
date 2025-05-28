import React, { useState, useEffect } from "react";
import { apiFetch } from "../services/apiClient";

const Inspect = () => {
  const [dateTime, setDateTime] = useState("");
  const [tujuanLepas, setTujuanLepas] = useState("");
  const [selectedTyreId, setSelectedTyreId] = useState("");

  const [isReady, setIsReady] = useState(null);
  const [tyres, setTyres] = useState([]);
  const [units, setUnits] = useState([]);
  const [removePurposeList, setRemovePurposeList] = useState([]);
  const [selectedInspectionId, setSelectedInspectionId] = useState(null);

  const [formData, setFormData] = useState({
    positionUnit: "",
    tread1: "",
    tread2: "",
    hmUnit: "",
    installedUnitId: "",
  });

  const user = JSON.parse(sessionStorage.getItem("user"));
  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  const username = capitalizeFirst(user?.name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiFetch("/inspection");
        setTyres(res.data || []);
        const dropdown = await apiFetch("/dropdown");
        setUnits(dropdown.unit || []);
        setRemovePurposeList(dropdown.removePurpose || []);
      } catch (error) {
        console.error("Gagal fetch data ban/unit:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedTyreId) return;
    const selected = tyres.find(
      (t) => t.tyre?.stockTyre?.id.toString() === selectedTyreId
    );
    if (selected) {
      setFormData({
        positionUnit: selected.positionTyre ?? "",
        tread1: selected.tyre.tread1 ?? "",
        tread2: selected.tyre.tread2 ?? "",
        hmUnit: selected.tyre.hmTyre ?? "",
        installedUnitId: selected.activityTyre?.unitId?.toString() ?? "",
      });

      setSelectedInspectionId(selected.id);
    }
  }, [selectedTyreId, tyres]);

  const handleSubmit = async () => {
    if (!selectedInspectionId) {
      alert("Pilih ban terlebih dahulu!");
      return;
    }

    const dataInspect = {
      dateTimeWork: dateTime,
      isReady: Boolean(isReady),
      removePurposeId: parseInt(tujuanLepas),
    };

    try {
      console.log(dataInspect);
      const result = await apiFetch(`/inspection/${selectedInspectionId}`, {
        method: "PUT",
        body: JSON.stringify(dataInspect),
      });
      alert("Inspect berhasil.");
      // navigate("/home");
      // window.location.reload();
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
              Serial Number <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedTyreId}
              onChange={(e) => setSelectedTyreId(e.target.value)}
            >
              <option value="">-- Select Tyre --</option>
              {tyres
                .filter(
                  (entry) =>
                    entry.isReady === null ||
                    (entry.isReady === false && entry.tyre.isScrap === false)
                ) // ✅ hanya tampilkan ban yang isReady === false
                .map((entry) => (
                  <option key={entry.id} value={entry.tyre.stockTyre.id}>
                    {entry.tyre.stockTyre.serialNumber}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Tyre Position</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={formData.positionUnit}
              readOnly
              // onChange={(e) => setLokasi(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Tread 1</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={formData.tread1}
              readOnly
              // onChange={(e) => setLokasi(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Tread 2</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={formData.tread2}
              readOnly
              // onChange={(e) => setLokasi(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">HM Tyre</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={formData.hmUnit}
              readOnly
              // onChange={(e) => setLokasi(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Unit Number</label>
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
            <label className="block font-medium mb-1">Time Inspection</label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded-md"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Tyre Ready to Use?</label>
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
              <option value="">-- Select Answer --</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
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
                Remove Purpose <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={tujuanLepas}
                onChange={(e) => setTujuanLepas(e.target.value)}
              >
                <option value="">-- Select Purpose --</option>
                {removePurposeList.map((remove) => (
                  <option key={remove.id} value={remove.id}>
                    {remove.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {/* Tombol Simpan */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500"
          >
            Add Inspection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inspect;
