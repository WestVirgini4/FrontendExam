import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/cartSlice';

const ProductCart = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="product-list">
      {products.map(product => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.title} />
          <h4>{product.title}</h4>
          <p>${product.price.toFixed(2)}</p>
          <button className="add-to-cart-btn" onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCart;


