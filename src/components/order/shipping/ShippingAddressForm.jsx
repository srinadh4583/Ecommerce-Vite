import React from 'react';
import { useState } from 'react';
import { useMutation,useQuery } from '@apollo/client'; 
import styled, { keyframes } from 'styled-components';
import { BsArrowRightShort } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import { ADD_ADDRESS,GET_USER_ADDRESSES } from '../../../services/graphql';
import ExistingAddressesComponent from './ExistingAddressesComponent';


// Define keyframes for animations
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

// Styled components
const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  background-color: black;
  color:white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  animation: ${fadeIn} 2s ease-out;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease-in-out;
  width: 95%;

  &:focus {
    border-color: #7e57c2;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #7e57c2;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  width: fit-content;
  display: flex;
  align-items: center;
  margin-top: 10px;

  &:hover {
    background-color: #663399;
  }
`;

const ArrowIcon = styled(BsArrowRightShort)`
  margin-left: 5px;
  transition: transform 0.3s ease-in-out;
`;

const AnimatedSubmitButton = styled(SubmitButton)`
  &:hover ${ArrowIcon} {
    transform: translateX(5px);
  }
`;

const ShippingAddressForm = () => {
  const [addressData, setAddressData] = useState({
    houseNo: '',
    street: '',
    city: '',
    postalCode: ''
  });
  const { state, dispatch } = useCart();
  const [showExistingAddress, setShowExistingAddress] = useState(false);
  const [add] = useMutation(ADD_ADDRESS);
  const { data,refetch } = useQuery(GET_USER_ADDRESSES, {
    variables: { userId: state.user.userId },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await add({
        variables: {
          userId: state.user.userId,
          address: { ...addressData, postalCode: parseInt(addressData.postalCode, 10) }
        }
      });
      const { addAddress } = data;
      dispatch({ type: 'ADD_ADDRESS', payload: { address: addAddress } });
      setAddressData({
        houseNo: '',
        street: '',
        city: '',
        postalCode: ''
      });
      refetch();
      setShowExistingAddress(true);
      
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {!showExistingAddress && (
        <Container>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">H-No:</Label>
              <Input type="text" id="houseNo" name="houseNo" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="address">Street:</Label>
              <Input type="text" id="Street" name="street" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="city">City:</Label>
              <Input type="text" id="city" name="city" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="postalCode">Postal Code:</Label>
              <Input
                type="text"
                id="postalCode"
                name="postalCode"
                pattern="[0-9]{6}"
                title="Postal code must be 6 digits"
                onChange={handleChange}
              />
            </FormGroup>
            <AnimatedSubmitButton type="submit">
              Submit
              <ArrowIcon />
            </AnimatedSubmitButton>
          </Form>
        </Container>
      )}
      {showExistingAddress && <ExistingAddressesComponent userAddresses={data.getUserAddresses}/>}
    </div>
  );
};

export default ShippingAddressForm;
