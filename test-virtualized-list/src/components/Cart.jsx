import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from './redux/cartSlice';
import './cart.css';

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h3>ตะกร้าสินค้า</h3>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.title} x {item.quantity} = ${ (item.price * item.quantity).toFixed(2) }
                <button onClick={() => dispatch(removeFromCart(item.id))}>ลบ</button>
              </li>
            ))}
          </ul>
          <hr />
          <h4>รวมทั้งหมด: ${total.toFixed(2)}</h4>
        </>
      ) : (
        <p>ไม่มีสินค้าในตะกร้า</p>
      )}
    </div>
  );
};

export default Cart;


