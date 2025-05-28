import React from "react";

const SummaryCard = ({ title, value, icon, borderColor }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow border-l-4 ${borderColor}`}>
      <p className="text-sm text-gray-500">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-lg font-bold text-gray-700">{value}</span>
        <span className="text-green-500 text-xl">{icon}</span>
      </div>
    </div>
  );
};

export default SummaryCard;
