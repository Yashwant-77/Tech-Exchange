const Pagination = ({ page, totalPages, setPage }) => {
  const visiblePages = 5;

  const start = Math.max(1, page - Math.floor(visiblePages / 2));
  const end = Math.min(totalPages, start + visiblePages - 1);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center text-white gap-2">
      <button className="px-5 py-2 bg-[#DD3A44] rounded-xl me-2" disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>

      {/* Show first page + ellipsis */}
      {start > 1 && (
        <>
          <button className="px-5 py-2  rounded-xl me-2" onClick={() => setPage(1)}>1</button>
          <span>...</span>
        </>
      )}

      {/* Middle pages */}
      {pages.map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className={num === page ? "bg-[#DD3A44]  px-5 py-2  rounded-xl me-2" : "px-5 py-2  rounded-xl me-2"}
        >
          {num}
        </button>
      ))}

      {/* Last page + ellipsis */}
      {end < totalPages && (
        <>
          <span>...</span>
          <button className="px-5 py-2 rounded-xl me-2" onClick={() => setPage(totalPages)}>{totalPages}</button>
        </>
      )}

      <button className="px-5 py-2 bg-[#DD3A44] rounded-xl ms-2" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination