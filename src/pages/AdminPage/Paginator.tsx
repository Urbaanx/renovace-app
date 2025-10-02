import { useState } from "react";

interface PaginatorProps {
  pages: number;
  onChangePage: (page: number) => void;
  startingPage: number;
}

function Paginator({ pages, onChangePage, startingPage }: PaginatorProps) {
  const [currentPage, setCurrentPage] = useState(startingPage);
  return (
    <div className="flex justify-end">
      <button
        onClick={() => {
          setCurrentPage(1);
          onChangePage(1);
        }}
        disabled={currentPage <= 1}
        className="w-8 h-8 disabled:text-gray-500"
      >
        {"<<"}
      </button>
      <button
        onClick={() => {
          setCurrentPage(currentPage - 1);
          onChangePage(currentPage - 1);
        }}
        disabled={currentPage <= 1}
        className="w-8 h-8 disabled:text-gray-500"
      >
        {"<"}
      </button>
      {currentPage >= 3 && (
        <button
          onClick={() => {
            setCurrentPage(currentPage - 2);
            onChangePage(currentPage - 2);
          }}
          className="w-8 h-8"
        >
          {currentPage - 2}
        </button>
      )}
      {currentPage >= 2 && (
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
            onChangePage(currentPage - 1);
          }}
          className="w-8 h-8"
        >
          {currentPage - 1}
        </button>
      )}
      <button
        disabled
        className="w-8 h-8 rounded-full bg-brownlight text-background"
      >
        {currentPage}
      </button>
      {currentPage <= pages - 1 && (
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
            onChangePage(currentPage + 1);
          }}
          className="w-8 h-8"
        >
          {currentPage + 1}
        </button>
      )}

      {currentPage <= pages - 2 && (
        <button
          onClick={() => {
            setCurrentPage(currentPage + 2);
            onChangePage(currentPage + 2);
          }}
          className="w-8 h-8"
        >
          {currentPage + 2}
        </button>
      )}

      <button
        onClick={() => {
          setCurrentPage(currentPage + 1);
          onChangePage(currentPage + 1);
        }}
        disabled={currentPage >= pages}
        className="w-8 h-8 disabled:text-gray-500"
      >
        {">"}
      </button>

      <button
        onClick={() => {
          setCurrentPage(pages);
          onChangePage(pages);
        }}
        disabled={currentPage >= pages}
        className="w-8 h-8 disabled:text-gray-500"
      >
        {">>"}
      </button>
    </div>
  );
}

export default Paginator;
