import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Switch from './Switch'
import UpdateUserData from './UpdateUserData';
// import UpdateCompanyType from '../../PopUps/UpdateCompanyType'

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


function TableBody({ data, selectedRows, onCheckboxChange, onSelectAll, onSwitchToggle,refetchData ,currentPage, rowsPerPage  }) {
  // Initialize switch states based on the isActiveCategory property
  const [switchStates, setSwitchStates] = useState({});
  useEffect(() => {
    // Initialize switch states based on the data
    if (data) {
      setSwitchStates(
        data.reduce((acc, item) => {
          acc[item.id] = true;
          return acc;
        }, {})
      );
    }
  }, [data]); // Re-run this effect when `data` changes

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleToggle = (id, isOn) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [id]: isOn
    }));
    if (onSwitchToggle) onSwitchToggle(id, isOn); 
  };
  const handleEditClick = (selectedUser) => {
    console.log(selectedUser)
    setSelectedUser(selectedUser);
    setOpenUpdateDialog(true);
  };

  const handleUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = () => {
    refetchData();
    handleUpdateDialogClose();
  };

  const handleSelectAll = () => {
    const currentRows = data.map((item) => item.id);
    if (selectedRows.length === data.length) {
      onSelectAll([]); // Deselect all if already selected
    } else {
      onSelectAll(currentRows); // Select only the current page's rows
    }
  };

  return (
    <><TableContainer>
    <StyledTable>
      <thead>
        <tr>
          <StyledTh>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedRows.length === data.length}
            />
          </StyledTh>
          <StyledTh>S.N</StyledTh>
          <StyledTh>Name</StyledTh>
          <StyledTh>Phone</StyledTh>
          <StyledTh>Email</StyledTh>
          <StyledTh>DOB</StyledTh>
          <StyledTh>Address</StyledTh>
          <StyledTh colSpan={2}>Actions</StyledTh>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <StyledTr key={item.id} $isDisabled={!switchStates[item.id]}>
            <StyledTd $isDisabled={!switchStates[item.id]}>
              <input
                type="checkbox"
                checked={selectedRows.includes(item.id)}
                onChange={() => onCheckboxChange(item.id)}
              />
            </StyledTd>
            <StyledTd $isDisabled={!switchStates[item.id]}>{index + 1 + (currentPage - 1) * rowsPerPage}</StyledTd>
            <StyledTd $isDisabled={!switchStates[item.id]}>{item.name}</StyledTd>
            <StyledTd $isDisabled={!switchStates[item.id]}>{item.phone}</StyledTd>
            <StyledTd $isDisabled={!switchStates[item.id]}>{item.email}</StyledTd>
            <StyledTd $isDisabled={!switchStates[item.id]}>{item.dob}</StyledTd>
            <StyledTd $isDisabled={!switchStates[item.id]}>{item.address.city},{item.address.district},{item.address.province},{item.address.country}</StyledTd>
            
            <StyledTd $isDisabled={!switchStates[item.id]} onClick={()=>handleEditClick(item)}>Edit</StyledTd>
            <StyledTd $isDisabled={!switchStates[item.id]}>
              <Switch
                isOn={switchStates[item.id]}
                onToggle={(isOn) => handleToggle(item.id, isOn)}
              />
            </StyledTd>
          </StyledTr>
        ))}
      </tbody>
    </StyledTable></TableContainer>
    {selectedUser && (
        <UpdateUserData
        title="Update CompanyType"
          open={openUpdateDialog}
          onClose={handleUpdateDialogClose}
          data={selectedUser}
        />
      )}
    </>
  );
}

export default TableBody;
