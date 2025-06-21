import React from "react";
// import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Pagination from "./Pagination";

const TyreTable = ({
  title,
  tyres,
  onClickTyre,
  navigateTo,
  onDeleteTyre,
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext,
  indexOfFirstItem,
  getStatus,
  searchInput,
}) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        {searchInput}
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full table-auto text-sm text-left border">
          <thead className="bg-[#0F2741] text-white">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Serial Number</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">HM (Hour Meter)</th>
              <th className="px-4 py-2 border">KM (Kilo Meter)</th>
            </tr>
          </thead>
          <tbody>
            {tyres.length > 0 ? (
              tyres.map((tyre, index) => {
                const { label, className } = getStatus(tyre);
                const hm = tyre.hmTyre ?? 0;
                const km = tyre.kmTyre ?? 0;

                return (
                  <tr key={tyre.id} className="even:bg-gray-50">
                    <td className="px-4 py-2 border">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td
                      className="px-4 py-2 border cursor-pointer"
                      onClick={() => onClickTyre?.(tyre.id)}
                    >
                      {tyre.stockTyre.serialNumber}
                    </td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-semibold ${className}`}
                      >
                        {label}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">{hm} hours</td>
                    <td className="px-4 py-2 border">{km} KM</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-4 py-3 text-gray-500">
                  No tyre data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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

export default TyreTable;
