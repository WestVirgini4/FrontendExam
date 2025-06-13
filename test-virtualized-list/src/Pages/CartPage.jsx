import React from 'react';
import ProductCart from '../components/ProductCart';
import Cart from '../components/Cart';
import '../components/cart.css';

const CartPage = () => {
  return (
    <div className="cart-page">
      <ProductCart />
      <Cart />
    </div>
  );
};

export default CartPage;
