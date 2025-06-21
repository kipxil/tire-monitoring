import React from "react";
import Pagination from "./Pagination";

const UnitTable = ({
  units,
  onClickUnit,
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext,
  indexOfFirstUnit,
  searchInput,
}) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold">Unit List</h2>
        {searchInput}
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full table-auto text-sm text-left border">
          <thead className="bg-[#0F2741] text-white">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Unit Number</th>
              <th className="px-4 py-2 border">HM Unit</th>
              <th className="px-4 py-2 border">KM (Kilo Meter)</th>
              <th className="px-4 py-2 border">Site</th>
            </tr>
          </thead>
          <tbody>
            {units.length > 0 ? (
              units.map((unit, index) => (
                <tr key={unit.id} className="even:bg-gray-50">
                  <td className="px-4 py-2 border">
                    {indexOfFirstUnit + index + 1}
                  </td>
                  <td
                    className="px-4 py-2 border cursor-pointer"
                    onClick={() => onClickUnit(unit.id)}
                  >
                    {unit.nomorUnit}
                  </td>
                  <td className="px-4 py-2 border">{unit.hmUnit} hours</td>
                  <td className="px-4 py-2 border">{unit.kmUnit} KM</td>
                  <td className="px-4 py-2 border">{unit.site?.name || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-4 py-3 text-gray-500">
                  No data unit.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onPrev={onPrev}
        onNext={onNext}
      />
    </div>
  );
};

export default UnitTable;
