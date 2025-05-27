import React from "react";

const Popup = ({ show, onClose, tyre, activityHistory }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {/* Tyre Info */}
        <h2 className="text-2xl font-bold mb-4">Unit Information</h2>
        <div className="space-y-4 pt-5">
          <p>
            <strong>Tyre 1:</strong>
            <br />
            Tread 1: {tyre.serialNumber}
            HM: KM:
          </p>
          <p>
            <strong>Tyre 2:</strong> {tyre.status}
          </p>
          <p>
            <strong>Tyre 3:</strong> {tyre.brand}
          </p>
          <p>
            <strong>Tyre 4:</strong> {tyre.size}
          </p>
          <p>
            <strong>Tyre 5:</strong> {tyre.currentUnit}
          </p>
          <p>
            <strong>Tyre 6:</strong> {tyre.position}
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
        {/* <h3 className="text-xl font-semibold mt-8 mb-3">Activity History</h3>
        <div className="space-y-4">
          {activityHistory.map((activity, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <h4 className="font-semibold">{activity.type}</h4>
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {activity.description}
              </pre>
              <p className="text-xs text-gray-500 text-right">
                {activity.date}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Popup;
