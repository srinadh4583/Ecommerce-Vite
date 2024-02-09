import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MessageContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
`;

const MessageText = styled.div`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
`;

const ShopNowButton = styled(NavLink)`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CartEmptyMessage = () => {
  return (
    <MessageContainer>
      <MessageText>Your cart is empty.</MessageText>
      <ShopNowButton to="/products">Shop Now</ShopNowButton>
    </MessageContainer>
  );
};

export default CartEmptyMessage;
