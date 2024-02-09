// OrderContext.js
import React, { createContext, useContext, useReducer } from 'react';

export const OrderContext = createContext();

const initialState = {
  addresses: [], // Array to hold addresses
  selectedProducts: [], // Array to hold selected products
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ADDRESS':
      return {
        ...state,
        addresses: [...state.addresses, action.payload.address],
      };
    case 'SELECT_PRODUCT':
      return {
        ...state,
        selectedProducts: [...state.selectedProducts, action.payload.product],
      };
    case 'UNSELECT_PRODUCT':
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(
          (id) => id !== action.payload.product
        ),
      };
      case 'CLEAR_SELECTED_PRODUCTS':
        return {
            selectedProducts:[],
        }
    default:
      return state;
  }
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};
