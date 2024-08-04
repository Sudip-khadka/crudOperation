import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import UserFormDialog from './UserForm';
import Buttons from './Buttons';
import ImportFile from './ImportFile';
import ConfirmationDialog from './ConfirmationDialog';
import Table from './Table';
import DeleteBtn from './DeleteBtn';
const userDataSampleFile = '/sampleData.csv';

const Container = styled(Paper)`
  width: 100%;
  padding: 40px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CategoryHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: var(--Neutral-White, #FFF);
  text-align: center;
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
  @media(max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: start;
  }
`;

const OtherButtons = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  color: #4d89f6;
  font-weight:bolder;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const CrudOperations = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: userData = [], isLoading, isError } = useQuery({
    queryKey: ['userData'],
    queryFn: () => JSON.parse(localStorage.getItem('userData')) || [],
  });

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleUpload = (data) => {
    console.log('Uploaded data:', data);
  };

  const handleCreateClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = () => {
    queryClient.invalidateQueries(['userData']); 
  };

  const handleDeleteSelected = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmDeletion = () => {
    setIsDeleting(true);
    try {
      const storedRecords = JSON.parse(localStorage.getItem('userData')) || [];
      const updatedRecords = storedRecords.filter(record => !selectedRows.includes(record.id));

      localStorage.setItem('userData', JSON.stringify(updatedRecords));

      queryClient.invalidateQueries(['userData']); // This triggers a refetch

      setSelectedRows([]);
      setShowConfirmation(false);
      setIsDeleting(false);
      console.log("All selected userData deleted successfully.");
    } catch (error) {
      console.error("Error deleting userData:", error);
      setIsDeleting(false);
    }
  };

  const cancelDeletion = () => {
    setShowConfirmation(false);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAll = (currentPageRows) => {
    if (selectedRows.length === currentPageRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentPageRows);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching userData</p>;

  const handleNavigateToProfiles = () => {
    navigate('/profiles');
  };

  return (
    <Container>
      <Title>Basic CRUD Operations</Title>
      <CategoryHeader>
        <h1 className='text-black'>User Data</h1>
        <OtherButtons>
          {selectedRows.length > 0 && (
            <DeleteBtn onClick={handleDeleteSelected} number={selectedRows.length} />
          )}
          <Buttons width="265px" title="Download .xlsx Sample" type="download" iconType="download" filePath={userDataSampleFile} />
          <Buttons title="Import .xlsx File" type="upload" iconType="upload" onClick={handleOpenDialog} />
          <Buttons width="221px" title="Create userData" type="create" onClick={handleCreateClick} iconType="create" />
          <Buttons width="221px" title="View All Profiles" type="profile" onClick={handleNavigateToProfiles} iconType="profile" />
        </OtherButtons>
      </CategoryHeader>
      <ImportFile
        open={dialogOpen}
        onClose={handleCloseDialog}
        onUpload={handleUpload}
        fileType="csv"
        section="userdata"
      />
      <Table
        data={userData}
        selectedRows={selectedRows}
        onCheckboxChange={handleCheckboxChange}
        onSelectAll={handleSelectAll}
      />
      <UserFormDialog
        open={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleSubmit}
        initialData={editIndex !== null ? userData[editIndex] : null}
      />
      <ConfirmationDialog
        open={showConfirmation}
        onConfirm={confirmDeletion}
        onCancel={cancelDeletion}
        title="Confirm Deletion"
        message={isDeleting ? "Please wait, your rows are being deleted..." : "Are you sure you want to delete the selected userData?"}
      />
    </Container>
  );
};

export default CrudOperations;
