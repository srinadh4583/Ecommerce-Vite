// ProductCard.js

import { React, useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { ADD_TO_CART } from '../../services/graphql';
import { useMutation } from '@apollo/client';
import { NavLink } from 'react-router-dom';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  width: 200px; /* Set a fixed width for each product card */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const ProductName = styled.h4`
  margin-top: 3px;
  
  color: #333;
`;

const ProductDescription = styled.p`
  margin-top: 3px;
  font-size: 1rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Number of lines to show */
  -webkit-box-orient: vertical;
`;

const ProductPrice = styled.p`
  margin-top: 3px;
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
`;
const AddToCartButton = styled.button`
  margin-top: 10px;
  margin-left:40px;
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #ff4500;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ProductCard = ({ product }) => {
  const { dispatch, state } = useCart();

  const [addToCartMutation] = useMutation(ADD_TO_CART); // Define the mutation hook
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    const { cart, user } = state;

    // Check if the product is already in the cart
    const isProductInCart = cart.some(item => item.product.productId === product.productId);
    if (!isProductInCart && !isAdding) {
      setIsAdding(true); // Set isAdding to true to prevent multiple add to cart requests

      try {
        const { data } = await addToCartMutation({
          variables: {
            cartItem: {
              productId: product.productId,
              quantity: 1,
              userId: user.userId
            },
          },
        });

        dispatch({
          type: 'ADD_TO_CART',
          payload: { product: data.addToCart },
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
        // Handle errors if needed
      } finally {
        setIsAdding(false); // Reset isAdding state after the add to cart operation is completed
      }
    } else {
      alert('This product is already in your cart!');
    }
  };

  return (
    <CardContainer>
      <NavLink to={{
        pathname: `/singleproduct/${product.productId}`
      }}>
        <ProductImage src={product.productImage} alt={product.productName} />
      </NavLink>
      <ProductName>{product.productName}</ProductName>
      <ProductDescription>{product.description}</ProductDescription>
      <ProductPrice>₹{product.price}/-</ProductPrice>
      <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
    </CardContainer>
  );
};


export default ProductCard;
