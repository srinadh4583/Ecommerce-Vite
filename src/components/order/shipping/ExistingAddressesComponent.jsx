import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TopContainer=styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
`;
const Container = styled.div`
  width: 700px;
  margin-top: 20px;
  // margin-left:100px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #f0f2f5;
    transform: scale(1.03);
  }
`;

const AddressHeader = styled.h1`
  margin-left:30px;
`;

const AddressDetails = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const AddressLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AddressInfo = styled.div`
  margin-top: 5px;
`;

const RadioInput = styled.input`
  margin-right: 10px;
`;

const AddButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`;

const AddressColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExistingAddressesComponent = ({ userAddresses }) => {
  const [selectedAddress, setSelectedAddress] = useState(userAddresses.length > 0 ? userAddresses[0].addressId : null); // Initialize with the first address's ID
  const navigate = useNavigate();

  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
  };

  const changeLink = () => {
    navigate('/addaddress');
  };

  const changeToPayLink = () => {
    navigate('/payment');
  };

  return (
    <div>
      <AddressHeader>Shipping Address</AddressHeader>
      <TopContainer className='address-center'>
        <AddressGrid>
          <AddressColumn>
            {userAddresses.map((address) => (
              <Container key={address.addressId}>
                <AddressDetails>
                  <AddressLabel>
                    <RadioInput
                      type="radio"
                      name="address"
                      value={address.addressId}
                      checked={selectedAddress === address.addressId}
                      onChange={() => handleAddressSelect(address.addressId)}
                    />
                  </AddressLabel>
                  <AddressInfo>
                    <div>H-no: {address.houseNo}</div>
                    <div>Street: {address.street}</div>
                    <div>City: {address.city}</div>
                    <div>Postal Code: {address.postalCode}</div>
                  </AddressInfo>
                </AddressDetails>
              </Container>
            ))}
          </AddressColumn>
          <AddressColumn>
            <AddButton onClick={changeLink}>Add Another Address</AddButton>
            <AddButton onClick={changeToPayLink}>Proceed To Payment</AddButton>
          </AddressColumn>
        </AddressGrid>
      </TopContainer>
    </div>
  );
};

export default ExistingAddressesComponent;
