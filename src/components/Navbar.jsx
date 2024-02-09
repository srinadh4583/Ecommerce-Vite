import React, { useState } from 'react';
import '../App.css';
import search from '../searchicon.svg';
import ShoppingCart from './ShoppingCart'; // Import the ShoppingCart component

const Navbar = ({ cartQuantity }) => {
  const [isCartVisible, setCartVisibility] = useState(false);

  const toggleCartVisibility = () => {
    setCartVisibility(!isCartVisible);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img
          src="https://via.placeholder.com/120x40" // Replace with your actual ecommerce logo URL
          alt="Ecommerce Logo"
          className="logo"
        />
      </div>

      <div className="search-container">
        <input type="text" placeholder="Search products..." className="search-input" />
        <button className="search-button">
          <img src={search} className="search" alt="search button" />
        </button>
      </div>

      <div className="cart-container">
        {/* Toggle the visibility of the ShoppingCart component */}
        <svg className="cart-icon" viewBox="0 0 24 24" onClick={toggleCartVisibility}>
          <path d="M21,4H6.478l-0.378-2.237C5.97,1.613,5.102,1,4.12,1H2C1.447,1,1,1.447,1,2s0.447,1,1,1h2.103l2.159,12.383 c0.097,0.549,0.623,0.951,1.184,0.951H16v2H6c-0.553,0-1,0.447-1,1s0.447,1,1,1h11c0.748,0,1.382-0.544,1.49-1.28l3-18 C21.965,4.546,21.318,4,21,4z"></path>
        </svg>
        <h1 className="cart-count">{cartQuantity}</h1>
      </div>

      {/* Render the ShoppingCart component based on visibility state */}
      {isCartVisible && <ShoppingCart />}
    </nav>
  );
};

export default Navbar;
