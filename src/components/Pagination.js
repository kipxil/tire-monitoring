import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4 mb-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <p className="text-sm">
        Page {currentPage} of {totalPages}
      </p>

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
