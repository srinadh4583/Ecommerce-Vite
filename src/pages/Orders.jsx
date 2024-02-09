import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaCalendarAlt } from 'react-icons/fa';
import { useCart } from '../components/context/CartContext';
import { GET_ORDER_HISTORY } from '../services/graphql';
import { useQuery } from '@apollo/client';

const OrdersContainer = styled.div`
  padding: 20px;
`;

const OrderCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const OrderDate = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

const ProductDetails = styled.div`
  flex-grow: 1;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProductDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const ProductPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Orders = () => {
  const { state } = useCart();
  const { user } = state;
  const [orders, setOrders] = useState([]);

  const { data, refetch } = useQuery(GET_ORDER_HISTORY, {
    variables: { userId: user.userId },
    skip: !user.userId, // Skip the query if userId is not available
  });

  useEffect(() => {
    if (data) {
      setOrders(data.getOrderHistory);
    }
  }, [data]);

  // Use a state variable to trigger refetch
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  // When user changes or triggerRefetch changes, refetch data
  useEffect(() => {
    if (user.userId || triggerRefetch) {
      refetch();
      // Reset triggerRefetch after refetch
      setTriggerRefetch(false);
    }
  }, [user.userId, triggerRefetch, refetch]);

  return (
    <OrdersContainer>
      {orders && orders.map((order, index) => (
        <OrderCard key={index}>
          <OrderDate>
            <FaCalendarAlt style={{ marginRight: '5px' }} />
            {order.orderDate}
          </OrderDate>
          {order.orderItems.map((item, itemIndex) => (
            <OrderItem key={itemIndex}>
              <ProductImage src={item.product.productImage} alt={item.product.productName} />
              <ProductDetails>
                <ProductName>{item.product.productName}</ProductName>
                <ProductDescription>{item.product.description}</ProductDescription>
                <ProductPrice>₹{item.product.price}</ProductPrice>
              </ProductDetails>
            </OrderItem>
          ))}
        </OrderCard>
      ))}
    </OrdersContainer>
  );
};

export default Orders;
