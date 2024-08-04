import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Buttons from './Components/Buttons';
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  align-items: center;
  justify-content: center;
  text-align: center;
  color:white;
`;


const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  padding: 20px !important;
  thead {
    height: 48px;
    border-radius: 4px;
    background: var(--Neutral-Grey-50, #F5F6F6);
  }
`;
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  @media(max-width: 768px) {
    overflow-x: scroll;
  }
`;
const StyledTh = styled.th`
  padding: 8px;
  color: var(--Neutral-Grey-900, #3C3D3D);
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
`;

const StyledTd = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 8px;
  font-family: "Be Vietnam Pro";
  text-align:left;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${({ $isDisabled }) => ($isDisabled ? 'rgba(175, 176, 177, 1)' : 'rgba(60, 61, 61, 1)')};
`;

const StyledTr = styled.tr`
  height: 60px;
  &:hover {
    background-color: ${({ $isDisabled }) => ($isDisabled ? '#f0f0f0' : '#ddd')};
  }
`;

const Profiles = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('userData')) || [];
    setRecords(storedRecords);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container>
      <div className='flex justify-between'>
        
      <h1 className='text-blue-500 font-bold'>Profiles</h1>
      <Buttons width="121px" title="Back" type="create" onClick={handleBack} iconType="back" />
      </div>
      <TableContainer>
    <StyledTable>
      <thead>
        <tr>
          <StyledTh>S.N</StyledTh>
          <StyledTh>Name</StyledTh>
          <StyledTh>Image</StyledTh>
          <StyledTh>Phone</StyledTh>
          <StyledTh>Email</StyledTh>
          <StyledTh>DOB</StyledTh>
          <StyledTh>Address</StyledTh>
        </tr>
      </thead>
      <tbody>
        {records.map((item, index) => (
          <StyledTr key={item.id} >
            
            <StyledTd >{index + 1}</StyledTd>
            <StyledTd >{item.name}</StyledTd>
            <StyledTd ><img src={item.profileImage} alt="profile Picture" /></StyledTd>
            <StyledTd >{item.phone}</StyledTd>
            <StyledTd >{item.email}</StyledTd>
            <StyledTd >{item.dob}</StyledTd>
            <StyledTd >{item.address.city},{item.address.district},{item.address.province},{item.address.country}</StyledTd>
            
           
          </StyledTr>
        ))}
      </tbody>
    </StyledTable></TableContainer>
      
    </Container>
  );
};

export default Profiles;
