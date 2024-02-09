import React from 'react';
import { useQuery } from '@apollo/client'; // Import useQuery hook for GraphQL queries
import ExistingAddressesComponent from './ExistingAddressesComponent';
import ShippingAddressForm from './ShippingAddressForm';
import { GET_USER_ADDRESSES } from '../../../services/graphql'; // Import the GraphQL query
import { useCart } from '../../context/CartContext';

const ShippingAddressComponent = ({ userId }) => {
  const { state } = useCart();
  const { user } = state;
  // Execute the GraphQL query to fetch user addresses based on the user ID
  const { loading, error, data } = useQuery(GET_USER_ADDRESSES, {
    variables: { userId: user.userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userAddresses = data.getUserAddresses;

  return (
    <div>
      {userAddresses && userAddresses.length > 0 ? (
        <ExistingAddressesComponent userAddresses={userAddresses} />
      ) : (
        <ShippingAddressForm />
      )}
    </div>
  );
};

export default ShippingAddressComponent;
