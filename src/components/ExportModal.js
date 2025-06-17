// components/ExportModal.jsx
import React from "react";

const ExportModal = ({
  show,
  onClose,
  onSubmit,
  selectedSite,
  setSelectedSite,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  siteList,
  user,
}) => {
  if (!show) return null;

  const filteredSites =
    user?.roleId === 1
      ? siteList
      : siteList.filter((s) => s.name === user.roleUser.name);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Export Data</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Site <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Site --</option>
            {filteredSites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
