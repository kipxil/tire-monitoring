import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex justify-center space-x-2 mt-4 mb-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === i + 1 ? "bg-blue-500 text-white" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
