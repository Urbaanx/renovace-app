import { useState, useEffect } from "react";

interface PaginatorProps {
  pages: number;
  onChangePage: (page: number) => void;
  startingPage: number;
}

function Paginator({ pages, onChangePage, startingPage }: PaginatorProps) {
  const [currentPage, setCurrentPage] = useState(startingPage);

  useEffect(() => {
    setCurrentPage(startingPage);
  }, [startingPage]);

  const handlePageClick = (page: number): void => {
    if (page < 1 || page > pages) return; 
    setCurrentPage(page);
    onChangePage(page);
  };

  const commonButtonClasses =
    "w-8 h-8 text-background disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
        className={commonButtonClasses}
      >
        {"<<"}
      </button>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={commonButtonClasses}
      >
        {"<"}
      </button>

      {currentPage > 1 && (
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          className="w-8 h-8 text-background"
        >
          {currentPage - 1}
        </button>
      )}

      <button className="w-8 h-8 bg-background text-mainColorText rounded-full">
        {currentPage}
      </button>

      {currentPage < pages && (
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          className="w-8 h-8 text-background"
        >
          {currentPage + 1}
        </button>
      )}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === pages}
        className={commonButtonClasses}
      >
        {">"}
      </button>

      <button
        onClick={() => handlePageClick(pages)}
        disabled={currentPage === pages}
        className={commonButtonClasses}
      >
        {">>"}
      </button>
    </div>
  );
}

export default Paginator;
