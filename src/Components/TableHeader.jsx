// TableHeader.js
import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--Neutral-Grey-900, #3C3D3D);
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom:10px;
  flex-wrap:wrap;
`;

const RowsPerPageSelect = styled.select`
  height: 40px;
  width: 80px;
  margin: 8px;
  padding: 5px;
  border-radius: 6px;
  border: 1px solid var(--Neutral-Grey-200, #DBDBDC);
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  width: 200px;
  color: rgba(107, 109, 111, 1);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 10px;
  width: 100%;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding:0 14px;
  border-radius: 4px;
border: 1px solid var(--Neutral-Grey-100, #E6E7E7);
`;

const SortLabel = styled.span`
  font-weight: 500;
  color: var(--Neutral-Grey-900, #3C3D3D);
  padding-right:8px;
  border-right:2px solid #D0D1D1;
`;

const SortSelect = styled.select`
  height: 40px;
  padding: 5px;
  font-size: 14px;
`;


function TableHeader({ rowsPerPage, onRowsPerPageChange, onSearch,onSort }) {
 

  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  const handleSortChange = (event) => {
    onSort(event.target.value);
  };

  return (
    <HeaderContainer>
      <div>
        <span>Show </span>
        <RowsPerPageSelect value={rowsPerPage} onChange={onRowsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </RowsPerPageSelect>
        <span> rows per page</span>
      </div>
      <div className='flex gap-2 flex-wrap'>
      <SearchContainer>
        <FaSearch />
        <SearchInput type="text" placeholder="Search..." onChange={handleSearchChange} />
      </SearchContainer>
     
     
      <SortContainer>
        <SortLabel>Sort By:</SortLabel>
        <SortSelect onChange={handleSortChange}>
          <option value="">Select</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </SortSelect>
      </SortContainer>
      </div>
    </HeaderContainer>
  );
}

export default TableHeader;
