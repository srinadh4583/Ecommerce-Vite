import React, { createContext, useContext, useReducer } from 'react';

// Define initial state and reducer for selected items
const initialSelectedItemsState = {
  selectedItems: [],
};

const selectedItemsReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload.itemId],
      };
    case 'DESELECT_ITEM':
      return {
        ...state,
        selectedItems: state.selectedItems.filter(itemId => itemId !== action.payload.itemId),
      };
    default:
      return state;
  }
};

// Create a new context for selected cart items
const SelectedItemsContext = createContext();

// Create a custom hook to use the selected items context
export const useSelectedItems = () => {
  const context = useContext(SelectedItemsContext);
  if (!context) {
    throw new Error('useSelectedItems must be used within a SelectedItemsProvider');
  }
  return context;
};

// Create a provider component to wrap your app with
export const SelectedItemsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(selectedItemsReducer, initialSelectedItemsState);

  return (
    <SelectedItemsContext.Provider value={{ state, dispatch }}>
      {children}
    </SelectedItemsContext.Provider>
  );
};
