import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import Pagination from "./Pagination";

function Table({
  data,
  selectedRows,
  onCheckboxChange,
  onSelectAll,
  refetchData,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [sortOrder, setSortOrder] = useState('');
  
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = data.filter(item => {
        return (item.name.toLowerCase().includes(lowercasedQuery))
    });

    // Apply sorting if a sort order is set
    if (sortOrder) {
      filtered.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page on search or filter change
  }, [searchQuery, data, sortOrder, ]);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleSearch = (query) => setSearchQuery(query);



  const handleSort = (order) => {
    setSortOrder(order);
  };

  // Calculate the data to be displayed for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const handleSelectAll = (currentPageRows) => {
    onSelectAll(currentPageRows);
  };


  return (
    <div className="w-full p-[20px]">
      <TableHeader
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        onSearch={handleSearch}
        onSort={handleSort}
      />
      <TableBody
        data={paginatedData}
        selectedRows={selectedRows}
        onCheckboxChange={onCheckboxChange}
        onSelectAll={handleSelectAll}
        refetchData={refetchData} // Pass refetch function
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / rowsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Table;
