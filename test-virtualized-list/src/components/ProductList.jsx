import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">ชื่อสินค้า</th>
          <th className="p-2 border">ราคา</th>
          <th className="p-2 border">การจัดการ</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="text-center">
            <td className="p-2 border">{product.name}</td>
            <td className="p-2 border">{product.price}</td>
            <td className="p-2 border space-x-2">
              <button
                onClick={() => onEdit(product)}
                className="bg-yellow-400 px-3 py-1"
              >
                แก้ไข
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1"
              >
                ลบ
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
