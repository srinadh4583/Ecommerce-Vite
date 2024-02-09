// ShoppingCart.js
import React from 'react';

const ShoppingCart = ({ cart, updateQuantity, removeFromCart }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.productId}>
              <div>
                <strong>{item.productName}</strong>
              </div>
              <div>
                Quantity: 
                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
              </div>
              <div>Price: ₹{item.price}</div>
              <div>Total: ₹{item.price * item.quantity}</div>
              <button onClick={() => removeFromCart(item.productId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
