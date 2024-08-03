import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserFormDialog from './UserForm';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, TextField } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  color: white;
  width: 100%;
  height: 100%;
  padding: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TableHeader = styled.div`
  color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTable = styled(Table)`
  
`;

const StyledTableCell = styled(TableCell)`
  && {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const StyledTableRow = styled(TableRow)`
  &&:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.h1`
  color: #4a90e2;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const CrudOperations = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedRecords, setSortedRecords] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('userData')) || [];
    setRecords(storedRecords);
  }, []);

  useEffect(() => {
    let filteredRecords = records.filter(record => 
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting
    filteredRecords.sort((a, b) => {
      if (a.name < b.name) return sortDirection === 'asc' ? -1 : 1;
      if (a.name > b.name) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedRecords(filteredRecords);
  }, [records, searchTerm, sortDirection]);

  const handleOpenDialog = (index = null) => {
    setEditIndex(index);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditIndex(null); // Reset the edit index when closing the dialog
  };

  const handleSubmit = (data) => {
    const updatedRecords = [...records];
    if (editIndex !== null) {
      updatedRecords[editIndex] = data;
    } else {
      updatedRecords.push(data);
    }
    setRecords(updatedRecords);
    localStorage.setItem('userData', JSON.stringify(updatedRecords));
    handleCloseDialog();
  };

  const handleDelete = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
    localStorage.setItem('userData', JSON.stringify(updatedRecords));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNavigateToProfiles = () => {
    navigate('/profiles');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Container>
      <Title>Basic CRUD Operations</Title>
      <TableHeader>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Add New User
        </Button>
      </TableHeader>
      <TableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell onClick={handleSort} style={{ cursor: 'pointer' }}>
                Name {sortDirection === 'asc' ? '🔼' : '🔽'}
              </StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>DOB</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{record.name}</StyledTableCell>
                <StyledTableCell>{record.email}</StyledTableCell>
                <StyledTableCell>{record.phone}</StyledTableCell>
                <StyledTableCell>{record.dob}</StyledTableCell>
                <StyledTableCell>{record.address.city}, {record.address.district}, {record.address.province}, {record.address.country}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => handleOpenDialog(index,record)} aria-label="edit">
                    <FaEdit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)} aria-label="delete">
                    <FaTrash />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={sortedRecords.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleNavigateToProfiles}>
        View All Profiles
      </Button>
      <UserFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        initialData={editIndex !== null ? records[editIndex] : null}
      />
    </Container>
  );
};

export default CrudOperations;
