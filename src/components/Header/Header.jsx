// Header.js
import {React,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdCart } from 'react-icons/io';
import NavBar from './NavBar';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { GET_CART_ITEMS } from '../../services/graphql';
import { useQuery } from '@apollo/client';
import Logo from './Logo';


const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  position:sticky;
  top:0;
  height:30px;
  z-index:9999;
`;

const CartIcon = styled(NavLink)`
  font-size: 24px;
  margin-left: 20px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  position: relative;

  &:hover {
    color: coral;
  }

  &.active {
    color: deepskyblue;
  }
`;

const CartQuantity = styled.span`
  position: absolute;
  top: -12px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px;
  font-size: 12px;
`;

const Header = () => {
  const { state, dispatch } = useCart();
  const { cartQuantity,user } = state;

  // Query to fetch cart items
  const { data } = useQuery(GET_CART_ITEMS, {
    variables: { userId: user.userId  }, // You may need to adjust this according to your authentication system
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data && data.getCartItems) {
      dispatch({
        type: 'SET_CART',
        payload: { cart: data.getCartItems },
      });
    }
  }, [data, dispatch]);
  return (
    <HeaderContainer>
     <Logo/>
      <NavBar />
      <CartIcon to="/cart" className={({ isActive }) => isActive? "active": ''}>
        <IoMdCart />
        {cartQuantity !== undefined && <CartQuantity>{cartQuantity}</CartQuantity>}
    
      </CartIcon>
    </HeaderContainer>
  );
};

export default Header;
