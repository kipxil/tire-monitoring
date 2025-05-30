import React, { useState } from "react";

const Popup = ({ show, onClose, tyre, activityHistory }) => {
  const [expandedItems, setExpandedItems] = useState({});

  if (!show) return null;

  const toggleExpand = (idx) => {
    setExpandedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl z-10"
        >
          ✕
        </button>

        {/* Konten Popup */}
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Tyre Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <strong>Serial Number:</strong> {tyre.serialNumber}
            </p>
            <p>
              <strong>Status:</strong> {tyre.status}
            </p>
            <p>
              <strong>Brand:</strong> {tyre.brand}
            </p>
            <p>
              <strong>Size:</strong> {tyre.size}
            </p>
            <p>
              <strong>Current Unit:</strong> {tyre.currentUnit}
            </p>
            <p>
              <strong>Position:</strong> {tyre.position}
            </p>
            <p>
              <strong>Installation Date:</strong> {tyre.installDate}
            </p>
            <p>
              <strong>Total Kilometers:</strong> {tyre.totalKm}
            </p>
            <p>
              <strong>Average Tread Depth:</strong> {tyre.avgTreadDepth}
            </p>
          </div>

          {/* Activity History */}
          <h3 className="text-xl font-semibold mt-8 mb-3">Activity History</h3>
          <div className="space-y-4">
            {activityHistory.map((activity, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-lg bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{activity.type}</h4>
                  {activity.type === "Removal" && (
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      {expandedItems[idx] ? "Hide Details" : "Show Details"}
                    </button>
                  )}
                </div>

                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {activity.description}
                </pre>

                {expandedItems[idx] && activity.type === "Removal" && (
                  <div className="mt-3 text-sm text-gray-700 space-y-2 pl-3 border-l-2 border-blue-200">
                    <div>
                      <strong>Inspection:</strong>
                      <ul className="list-disc ml-5">
                        <li>
                          Remove Purpose:{" "}
                          {activity.inspectionDetail?.removePurpose || "-"}
                        </li>
                        <li>
                          Incident Note:{" "}
                          {activity.inspectionDetail?.incidentNote || "-"}
                        </li>
                        <li>
                          Analysis Note:{" "}
                          {activity.inspectionDetail?.analysisNote || "-"}
                        </li>
                        <li>
                          DateTime In:{" "}
                          {activity.inspectionDetail?.dateTimeIn
                            ? new Date(
                                activity.inspectionDetail.dateTimeIn
                              ).toLocaleString()
                            : "-"}
                        </li>
                        <li>
                          Work Date:{" "}
                          {activity.inspectionDetail?.dateTimeWork
                            ? new Date(
                                activity.inspectionDetail.dateTimeWork
                              ).toLocaleString()
                            : "-"}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <strong>Action Tyre:</strong>
                      <ul className="list-disc ml-5">
                        <li>
                          Remove Purpose:{" "}
                          {activity.actionTyreDetail?.removePurpose || "-"}
                        </li>
                        <li>
                          Work Date:{" "}
                          {activity.actionTyreDetail?.dateTimeWork
                            ? new Date(
                                activity.actionTyreDetail.dateTimeWork
                              ).toLocaleString()
                            : "-"}
                        </li>
                        <li>
                          Done Date:{" "}
                          {activity.actionTyreDetail?.dateTimeDone
                            ? new Date(
                                activity.actionTyreDetail.dateTimeDone
                              ).toLocaleString()
                            : "-"}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500 text-right mt-2">
                  {activity.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
