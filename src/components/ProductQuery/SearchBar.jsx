// SearchBar.js

import React from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi'; // Import the search icon from react-icons

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  background-color: #fff;
`;

const SearchIcon = styled(BiSearch)`
  font-size: 1.5rem;
  margin-right: 10px;
  color: #666;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 5px;
`;

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <SearchBarContainer>
      <SearchIcon />
      <SearchInput
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
