import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  margin: 20px auto;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const SomeThingWentWrong = () => {
  return (
    <ErrorContainer>
      <ErrorMessage>Oops! Something went wrong.</ErrorMessage>
      <p>We apologize for the inconvenience. Please try again later.</p>
    </ErrorContainer>
  );
};

export default SomeThingWentWrong;
