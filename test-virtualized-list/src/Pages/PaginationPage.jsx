import React from "react";
import usePaginationFromFetch from '../components/hooks/usePaginationFromFetch';
import '../Pages/Pagination.css';

const PaginationPage = () => {
  const {
    currentItems,
    currentPage,
    setCurrentPage,
    totalPages,
    pageNumbers,
    loading,
  } = usePaginationFromFetch("https://api.thedogapi.com/v1/breeds", 10);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="pagination-page">
      <h1 className="pagination-title">รายการสายพันธุ์สุนัขและอายุไข</h1>
      
      <div className="pagination-items">
        {currentItems.map((item) => (
          <div key={item.id} className="pagination-item">
            {item.id}. {item.name} - {item.life_span}
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            className={`pagination-btn ${num === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}

        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationPage;


