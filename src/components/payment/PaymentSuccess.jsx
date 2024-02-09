// PaymentSuccess.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { TiTick } from 'react-icons/ti';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { GET_ORDER_HISTORY, DELETE_CART_ITEM } from '../../services/graphql';
import { useQuery, useMutation } from '@apollo/client';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  position: relative;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #4caf50;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const OrderPlacedMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #2196f3;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const IconContainer = styled.div`
  font-size: 32px;
  margin-right: 10px;
`;

const PaymentSuccess = () => {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { state: orderState, dispatch: orderDispatch } = useOrder();
  const { selectedProducts } = orderState;
  const { user, cart } = cartState;
  const navigate = useNavigate();
  const [deleteCartItem] = useMutation(DELETE_CART_ITEM);

  const { data } = useQuery(GET_ORDER_HISTORY, {
    variables: { userId: user.userId },
  });

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await deleteCartItem({
        variables: { cartItemId: cartItemId }
      });
      // Refetch cart items after successful removal
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  //let emptyArr=[];
  if (data) {
    selectedProducts.forEach(selected=>{
      let productId;
      selected.forEach(ele=>{
        productId=ele.productId
      })
      cart.forEach(product=>{
        if(product.product.productId=== productId){  
          handleRemoveFromCart(product.cartItemId) 
        }
      })
    })
  }
  useEffect(() => {
    if (data) {
      // Dispatch action to remove selected products from cart
      cartDispatch({
        type: 'REMOVE_SELECTED_PRODUCTS_FROM_CART',
        payload: { selectedProducts: orderState.selectedProducts },
      });

      // Clear selected products from OrderContext
       orderDispatch({ type: 'CLEAR_SELECTED_PRODUCTS' });

      const timer = setTimeout(() => {
        navigate('/orders');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <Container>
      <SuccessMessage>
        <IconContainer>
          <TiTick />
        </IconContainer>
        Payment Successful
      </SuccessMessage>
      <OrderPlacedMessage>
        <IconContainer>
          <RiShoppingBag3Line />
        </IconContainer>
        Order Placed
      </OrderPlacedMessage>
    </Container>
  );
};

export default PaymentSuccess;
