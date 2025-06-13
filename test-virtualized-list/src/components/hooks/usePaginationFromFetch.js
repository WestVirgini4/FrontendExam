import { useEffect, useState } from "react";

const usePaginationFromFetch = (apiUrl, itemsPerPage = 10, startPage = 1) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(startPage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch(apiUrl)
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        });
    };
    fetchData();
  }, [apiUrl]);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return {
    currentItems,
    currentPage,
    setCurrentPage,
    totalPages,
    pageNumbers: Array.from({ length: totalPages }, (_, i) => i + 1),
    loading,
  };
};

export default usePaginationFromFetch;
