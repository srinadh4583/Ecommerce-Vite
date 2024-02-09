import { useEffect, React, useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../components/context/CartContext';
import { NavLink } from 'react-router-dom';
import CartEmptyMessage from '../components/Error/CartEmptyMessage';
import { GET_CART_ITEMS, DELETE_CART_ITEM } from '../services/graphql';
import { useQuery, useMutation } from '@apollo/client';
import Spinner from '../components/Spinner';
import SomeThingWentWrong from '../components/Error/SomeThingWentWrong';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useOrder } from '../components/context/OrderContext';



const CartContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const CartItem = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  position: relative;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    max-width: 100px;
    margin-right: 15px;
    border-radius: 5px;
  }

  div {
    flex: 1;
  }

  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    margin: 5px 0;
    color: #666;
  }

  span {
    font-weight: bold;
    margin-left: auto;
  }

  button {
    background-color: #ff4500;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }

  button:hover {
    background-color: #d43900;
  }

  .remove-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #999;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
  }

  .remove-icon:hover {
    color: #e74c3c;
  }
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  color: #666;
`;
const TotalPrice = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
`;

const PlaceOrderButton = styled.button`
  margin-top: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background-color: #45a049;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;
const LeftButton = styled.button`
  background-color: #ddd;
  border: none;
  padding: 5px;
  cursor: pointer;
  position:relative;
  left:140px;
`;
const QuantityButton = styled.button`
  background-color: #ddd;
  border: none;
  padding: 5px;
  cursor: pointer;
`;

const QuantityText = styled.span`
  margin-right:10px;
  font-size: 1rem;
  font-weight: bold;
`;

const Cart = () => {
  const [selectedProducts, setSelectedProducts] = useState([]); // State for selected products
  const [selectedData, setSelectedData] = useState([]);
  const { state, dispatch } = useCart();
  const { cart, user } = state;
  const { dispatch: orderDispatch } = useOrder();

  const { loading, error, data, refetch } = useQuery(GET_CART_ITEMS, {
    variables: { userId: user.userId },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteCartItem] = useMutation(DELETE_CART_ITEM);

  useEffect(() => {
    if (data && data.getCartItems) {
      dispatch({
        type: 'SET_CART',
        payload: { cart: data.getCartItems },
      });
    }
  }, [data, dispatch]);

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await deleteCartItem({
        variables: { cartItemId: cartItemId }
      });
      // Refetch cart items after successful removal
      refetch();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };



  const handleIncreaseQuantity = (product) => {
    const updatedCart = cart.map((item) => {
      if (item.cartItemId === product.cartItemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    dispatch({
      type: 'SET_CART',
      payload: { cart: updatedCart },
    });
  };

  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      const updatedCart = cart.map((item) => {
        if (item.cartItemId === product.cartItemId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      dispatch({
        type: 'SET_CART',
        payload: { cart: updatedCart },
      });
    }
  };

  const handleProductSelect = (productId, productData) => {
    setSelectedProducts(prevSelected => {
      if (prevSelected.includes(productId)) {
        setSelectedData(prevData => prevData.filter(ele => ele.productId !== productData.product.productId));
        return prevSelected.filter(id => id !== productId);
      } else {
        setSelectedData(prevData => [...prevData, productData.product]);
        return [...prevSelected, productId];
      }
    });
  };
  let selectedItems = [];
  if (selectedData) {
    selectedData.map(ele => {
      if (!selectedItems.includes(ele)) {
        selectedItems.push(ele);
      }
    })
  }

  useEffect(() => {
    if (selectedData && selectedData.length > 0) {
      orderDispatch({ type: 'SELECT_PRODUCT', payload: { product: selectedItems } });
    }
  }, [selectedData, orderDispatch]);


  return (
    <CartContainer>
      <h2>Shopping Cart</h2>
      {loading && <Spinner />}
      {error && <SomeThingWentWrong />}
      {!loading && !error && cart.length === 0 && (
        <EmptyCartMessage>
          <CartEmptyMessage />
        </EmptyCartMessage>
      )}
      {!loading && !error && cart.length > 0 && (
        <div>
          {cart.map((product) => (
            <CartItem key={product.cartItemId}>
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.cartItemId)}
                onChange={() => handleProductSelect(product.cartItemId, product)}
              />
              <img src={product.product.productImage} alt={product.product.productName} />
              <div>
                <h3>{product.product.productName}</h3>
                <p>₹{product.product.price}</p>
              </div>
              <QuantityContainer>
                <LeftButton onClick={() => handleDecreaseQuantity(product)}> <FaMinus /> </LeftButton>
                <QuantityText>Quantity: {product.quantity}</QuantityText>
                <QuantityButton onClick={() => handleIncreaseQuantity(product)}> <FaPlus /> </QuantityButton>
              </QuantityContainer>
              <FaTrash className="remove-icon" onClick={() => handleRemoveFromCart(product.cartItemId)} />
            </CartItem>
          ))}
          {/* <TotalPrice>Total: ₹{calculateTotalPrice()}.00/-</TotalPrice> */}
          {selectedProducts.length > 0 && (
            <TotalPrice>
              Selected Items Total: ₹
              {cart
                .filter(product => selectedProducts.includes(product.cartItemId))
                .reduce((total, product) => total + parseFloat(product.product.price) * product.quantity, 0)
                .toFixed(2)}
              /-
            </TotalPrice>
          )}
          <NavLink to='/placeorder'>
            <PlaceOrderButton >Place Order</PlaceOrderButton>
          </NavLink>
        </div>
      )}
    </CartContainer>
  );
};

export default Cart;