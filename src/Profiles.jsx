import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
  color:white;
`;

const TableHeader = styled(TableHead)`
  background-color: #333; /* Dark grey background for table header */
`;

const StyledTableCell = styled(TableCell)`
  color: white; /* White text color for table cells */
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
      <h1 className='text-blue-500 font-bold'>Profiles</h1>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>DOB</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>District</StyledTableCell>
              <StyledTableCell>Province</StyledTableCell>
              <StyledTableCell>Country</StyledTableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (
              <TableRow key={index}>
                <StyledTableCell>{record.name}</StyledTableCell>
                <StyledTableCell>{record.email}</StyledTableCell>
                <StyledTableCell>{record.phone}</StyledTableCell>
                <StyledTableCell>{record.dob}</StyledTableCell>
                <StyledTableCell>{record.address.city}</StyledTableCell>
                <StyledTableCell>{record.address.district}</StyledTableCell>
                <StyledTableCell>{record.address.province}</StyledTableCell>
                <StyledTableCell>{record.address.country}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={records.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleBack}>
        Back to CRUD Operations
      </Button>
    </Container>
  );
};

export default Profiles;
