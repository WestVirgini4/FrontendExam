import React, { useEffect, useState } from 'react';
import './exportcsv.css';

const API_URL = 'https://fakestoreapi.com/products';

function convertToCSV(data) {
  const header = Object.keys(data[0]);
  const csvRows = [];

  csvRows.push(header.join(','));

  for (const row of data) {
    const values = header.map(field => {
      let val = row[field];
      if (typeof val === 'string') {
        // Escape quotes
        val = val.replace(/"/g, '""');
        return `"${val}"`;
      }
      return val;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}

const ExportCSV = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleExport = () => {
    if (!products.length) return;

    const csvData = convertToCSV(products);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="exportcsv-container">
      <h2>Product Item</h2>
      <button className="btn-export" onClick={handleExport}>Export as CSV</button>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price ($)</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, title, price, category }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{price.toFixed(2)}</td>
              <td>{category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExportCSV;
