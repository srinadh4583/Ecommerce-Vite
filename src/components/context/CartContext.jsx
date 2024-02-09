// CartContext.js

import React, { createContext, useContext, useReducer } from 'react';

// Define your initial state
const initialState = {
  user: {
    userName: '',
    password: '',
    userId: '', // Add userId here
    addresses: [], // Add addresses array here
  },
  cart: [],
  cartQuantity: 0,
  orders: [],
};

// Define your reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload.product],
        cartQuantity: state.cartQuantity + 1,
      };
    case 'REMOVE_FROM_CART':
      const updatedCart = state.cart.filter(
        (product) => product.productId !== action.payload.productId
      );
      return {
        ...state,
        cart: updatedCart,
        cartQuantity: state.cartQuantity - 1,
      };
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload.cart,
        cartQuantity: action.payload.cart.length,
      };
    case 'SET_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.user,
        },
      };
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload.orders,
      };
    case 'REMOVE_SELECTED_PRODUCTS_FROM_CART':
      return {
        ...state,
        cartQuantity: state.cart.length,
      };
    // Add more cases for other actions like removing from the cart, etc.
    default:
      return state;
  }
};

// Create your CartContext
const CartContext = createContext();

// Create a custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Create a CartProvider component to wrap your app with
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
