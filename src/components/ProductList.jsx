import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../services/graphql';
import Navbar from './Navbar';
import ShoppingCart from './ShoppingCart';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.getAllProducts;

  const handleAddToCart = (productId) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item.productId === productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const productToAdd = { productId, quantity: 1, ...products.find(p => p.productId === productId) };
      updatedCart.push(productToAdd);
    }

    setCart(updatedCart);
    setCartQuantity(updatedCart.length);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(item => (item.productId === productId ? { ...item, quantity: newQuantity } : item));
    setCart(updatedCart);
    setCartQuantity(updatedCart.length);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    setCartQuantity(updatedCart.length);
  };

  return (
    <div>
      <Navbar cartQuantity={cartQuantity} />
      <div className="card-container">
        {products.map(product => (
          <div key={product.productId} className="card">
            <img src={product.productImage} alt={product.productName} />
            <h3>{product.productName}</h3>
            <strong>₹{product.price}</strong>
            <p>{product.description}</p>
            <div className="button-center">
              <button onClick={() => handleAddToCart(product.productId)}>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/cart">Go to Cart</Link>
      {/* Render the ShoppingCart component */}
      {/* Pass cart, updateQuantity, and removeFromCart as props */}
      <ShoppingCart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
    </div>
  );
};

export default ProductList;
