// ShoppingCartPage.js
import React from 'react';

const ShoppingCartPage = ({ cartItems }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map(item => (
        <div key={item.cartItemId}>
          <img src={item.product.productImage} alt={item.product.productName} />
          <h3>{item.product.productName}</h3>
          <strong>₹{item.product.price}</strong>
          <p>{item.product.description}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCartPage;
