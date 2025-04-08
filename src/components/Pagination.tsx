interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-3 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 
                 hover:from-indigo-600 hover:to-purple-600 text-white disabled:opacity-50 
                 disabled:cursor-not-allowed transition-all duration-200 shadow-md 
                 hover:shadow-lg flex items-center gap-2"
      >
        <span>←</span> Previous
      </button>
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg transition-all duration-200 font-medium ${
              currentPage === page
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md scale-105"
                : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 
                 hover:from-indigo-600 hover:to-purple-600 text-white disabled:opacity-50 
                 disabled:cursor-not-allowed transition-all duration-200 shadow-md 
                 hover:shadow-lg flex items-center gap-2"
      >
        Next <span>→</span>
      </button>
    </div>
  );
}
