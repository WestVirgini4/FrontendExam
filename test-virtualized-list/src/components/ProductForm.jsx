import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, editingProduct, cancelEdit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
    } else {
      setName('');
      setPrice('');
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    const product = {
      id: editingProduct?.id || Date.now(),
      name,
      price,
    };
    onSubmit(product);
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="ชื่อสินค้า"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="number"
        placeholder="ราคา"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 mr-2">
        {editingProduct ? 'อัปเดต' : 'เพิ่ม'}
      </button>
      {editingProduct && (
        <button
          type="button"
          onClick={cancelEdit}
          className="bg-gray-400 text-white px-4 py-2"
        >
          ยกเลิก
        </button>
      )}
    </form>
  );
};

export default ProductForm;
