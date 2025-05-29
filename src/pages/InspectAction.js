import React, { useEffect, useState } from "react";
import { apiFetch } from "../services/apiClient";
import { toast } from "react-toastify";

const ActionTyreManager = () => {
  const [actionTyres, setActionTyres] = useState([]);
  const [removePurposeOptions, setRemovePurposeOptions] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [filterPurposeId, setFilterPurposeId] = useState("");
  const [formData, setFormData] = useState({
    dateTimeWork: "",
    dateTimeDone: "",
    isDone: false,
  });

  // Ambil data action dan dropdown purpose
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [actionData, dropdownData] = await Promise.all([
        apiFetch("/action"),
        apiFetch("/dropdown"),
      ]);
      console.log(actionData);
      console.log(dropdownData);

      setActionTyres(actionData.data);
      setRemovePurposeOptions(dropdownData.removePurpose || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleActionSelect = (actionId) => {
    const action = actionTyres.find((a) => a.id === actionId);
    setSelectedAction(action);
    setFormData({
      dateTimeWork: action.dateTimeWork || "",
      dateTimeDone: action.dateTimeDone || "",
      isDone: action.isDone,
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.dateTimeWork || !formData.dateTimeDone) {
      toast.error("Mohon isi semua field yang wajib.");
      return;
    }

    const updatedData = {
      dateTimeWork: formData.dateTimeWork || null,
      dateTimeDone: formData.dateTimeDone || null,
      isReady: formData.isDone,
    };

    try {
      console.log(updatedData);
      await apiFetch(`/action/${selectedAction.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      toast.success("Data berhasil diupdate!");
      fetchData();
      setSelectedAction(null);
    } catch (error) {
      console.error("Gagal mengupdate data:", error);
      toast.error("Gagal mengupdate data");
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "-";
    return new Date(dateTime).toLocaleString("id-ID");
  };

  const filteredActions = actionTyres
    .filter((action) => !action.isDone) // Hanya tampilkan yang belum selesai
    .filter((action) =>
      filterPurposeId === ""
        ? true
        : action.removePurposeId === parseInt(filterPurposeId)
    );

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Action Tyre Management
      </h1>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">
            Filter by Remove Purpose:
          </label>
          <select
            value={filterPurposeId}
            onChange={(e) => setFilterPurposeId(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Purpose</option>
            {removePurposeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          {filterPurposeId && (
            <button
              onClick={() => setFilterPurposeId("")}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Serial Number</th>
              <th className="border px-4 py-2 text-left">Purpose</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Date Work</th>
              <th className="border px-4 py-2 text-left">Date Done</th>
              <th className="border px-4 py-2 text-left">Ready</th>
              <th className="border px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredActions.map((action) => (
              <tr key={action.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{action.id}</td>
                <td className="border px-4 py-2">
                  {action.tyre.stockTyre.serialNumber}
                </td>
                <td className="border px-4 py-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {action.removePurpose.name}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      action.isDone
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {action.isDone ? "Done" : "In Progress"}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  {formatDateTime(action.dateTimeWork)}
                </td>
                <td className="border px-4 py-2">
                  {formatDateTime(action.dateTimeDone)}
                </td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      action.tyre.isReady
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {action.tyre.isReady ? "Ready" : "Not Ready"}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleActionSelect(action.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Form */}
      {selectedAction && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Update Action - {selectedAction.tyre.stockTyre.serialNumber}
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
              {selectedAction.removePurpose.name}
            </span>
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Time Work
                </label>
                <input
                  type="datetime-local"
                  value={formData.dateTimeWork}
                  onChange={(e) =>
                    handleInputChange("dateTimeWork", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Time Done
                </label>
                <input
                  type="datetime-local"
                  value={formData.dateTimeDone}
                  onChange={(e) =>
                    handleInputChange("dateTimeDone", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDone"
                  checked={formData.isDone}
                  onChange={(e) =>
                    handleInputChange("isDone", e.target.checked)
                  }
                  className="h-4 w-4"
                  disabled={selectedAction?.removePurpose?.name === "SCRAP"}
                />
                <label
                  htmlFor="isDone"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Ready for use
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setSelectedAction(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionTyreManager;
