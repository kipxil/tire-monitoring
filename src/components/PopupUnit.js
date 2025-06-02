import React from "react";

const UnitDetailModal = ({ unitData, isOpen, onClose }) => {
  if (!isOpen || !unitData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">
          Detail Unit: {unitData.nomorUnit}
        </h2>
        <p>
          <strong>Location:</strong> {unitData.location}
        </p>
        <p>
          <strong>HM:</strong> {unitData.hmUnit} | <strong>KM:</strong>{" "}
          {unitData.kmUnit}
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">
          Daftar Ban Terpasang:
        </h3>
        <ul className="grid grid-cols-2 gap-2">
          {unitData.tyres.map((item) => {
            const tyre = item.tyre;
            const pos = item.position;

            return tyre ? (
              <li key={item.id} className="p-2 border rounded-md shadow">
                <p>
                  <strong>Posisi:</strong> {pos}
                </p>
                <p>
                  <strong>ID Ban:</strong> {tyre.id}
                </p>
                <p>
                  <strong>Serial Number:</strong> {tyre.stockTyre.serialNumber}
                </p>
                <p>
                  <strong>Tread:</strong> {tyre.tread1}/{tyre.tread2}
                </p>
                <p>
                  <strong>HM:</strong> {tyre.hmTyre ?? "N/A"} |{" "}
                  <strong>KM:</strong> {tyre.kmTyre ?? "N/A"}
                </p>
              </li>
            ) : (
              <li key={item.id}>Ban posisi {pos} tidak tersedia.</li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UnitDetailModal;
