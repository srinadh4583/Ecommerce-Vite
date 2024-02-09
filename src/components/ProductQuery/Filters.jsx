// Filters.js
import React from 'react';
import styled from 'styled-components';

// const FiltersContainer = styled.div`
//   border: 1px solid #ddd;
//   padding: 10px;
//   margin: 10px;
//   border-radius: 8px;
// `;

const FiltersHeader = styled.h3`
  display: flex;
  justify-content: space-between;
`;

const FilterOptions = styled.div`
  display: flex;
`;

const Dropdown = styled.select`
  padding: 8px;
  margin-left: 10px;
`;

const Filters = ({ categories, selectedFilter, onFilterChange }) => {
  const handleFilterChange = (event) => {
    const selectedCategory = event.target.value;
    onFilterChange(selectedCategory);
  };

  return (
    <div>
      <FiltersHeader>
        <span>Filters</span>
        <FilterOptions>
          <Dropdown value={selectedFilter} onChange={handleFilterChange}>
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Dropdown>
        </FilterOptions>
      </FiltersHeader>
    </div>
  );
};

export default Filters;
