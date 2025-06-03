import React from "react";

const UnitDetailModal = ({ unitData, isOpen, onClose }) => {
  if (!isOpen || !unitData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-600 hover:text-red-500 text-xl z-10"
        >
          ✕
        </button>

        {/* Konten Popup */}
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Unit Information</h2>
          <div className="space-y-4">
            <p>
              <strong>Nomor Unit:</strong> {unitData.nomorUnit}
            </p>
            <p>
              <strong>Location:</strong> {unitData.location}
            </p>
            <p>
              <strong>HM:</strong> {unitData.hmUnit} | <strong>KM:</strong>{" "}
              {unitData.kmUnit}
            </p>
            <p>
              <strong>Created Date:</strong>{" "}
              {new Date(unitData.createdAt).toLocaleDateString()}
            </p>
          </div>
          <h3 className="text-xl font-semibold mt-8 mb-3">
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
                  {/* <p>
                  <strong>ID Ban:</strong> {tyre.id}
                </p> */}
                  <p>
                    <strong>Serial Number:</strong>{" "}
                    {tyre.stockTyre.serialNumber}
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
    </div>
  );
};

export default UnitDetailModal;
