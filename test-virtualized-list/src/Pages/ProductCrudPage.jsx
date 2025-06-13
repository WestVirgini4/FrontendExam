import React, { useState, useEffect } from 'react';
import './ProductCrudPage.css';

const ProductCrudPage = () => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = () => {
    if (!name || !price) return;
    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = { name, price };
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, { name, price }]);
    }
    setName('');
    setPrice('');
  };

  const editProduct = (index) => {
    setName(products[index].name);
    setPrice(products[index].price);
    setEditIndex(index);
  };

  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
    if (editIndex === index) {
      setName('');
      setPrice('');
      setEditIndex(null);
    }
  };

  return (
    <div className="product-crud-container">
      <h2 className="product-crud-title">เพิ่มลบและแก้ไขรายการสินค้า</h2>

      <div className="product-crud-form">
        <input
          className="product-crud-input"
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="product-crud-input"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="product-crud-button" onClick={addProduct}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <table className="product-crud-table">
        <thead>
          <tr>
            <th>ชื่อสินค้า</th>
            <th>ราคา</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="3" className="product-crud-empty">
                ไม่มีสินค้า
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className="product-crud-edit-btn"
                    onClick={() => editProduct(index)}
                  >
                    แก้ไข
                  </button>
                  <button
                    className="product-crud-delete-btn"
                    onClick={() => deleteProduct(index)}
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCrudPage;

