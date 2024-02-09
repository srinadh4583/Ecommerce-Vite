// EcommerceApp.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import ProductList from './ProductList';

const EcommerceApp = () => {
    const [cartQuantity, setCartQuantity] = useState(0);

    const handleAddToCart = () => {
        console.log('entered');
        setCartQuantity(prevQuantity => prevQuantity + 1);
    };

    return (
        <div>
            <ProductList handleAddToCart={handleAddToCart} />
        </div>
    );
};

export default EcommerceApp;
