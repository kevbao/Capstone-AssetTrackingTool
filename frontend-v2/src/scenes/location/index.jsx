import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Location = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Sample data for locations
  const locations = [
    {
      id: 1,
      name: "Site 1",
      specificLocation: "Building 1",
      description: "Testing site",
      locationType: "Testing",
    },
    {
      id: 2,
      name: "Site 2",
      specificLocation: "Building 2",
      description: "Assembly site",
      locationType: "Assembly",
    },
    {
      id: 3,
      name: "Site 3",
      specificLocation: "Building 3",
      description: "Storage site",
      locationType: "Storage",
    },
    {
      id: 4,
      name: "Site 4",
      specificLocation: "Building 4",
      description: "Office site",
      locationType: "Office",
    },
    {
      id: 5,
      name: "Site 5",
      specificLocation: "Building 5",
      description: "Shipping site",
      locationType: "Shipping",
    },
  ];

  // Columns configuration
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "specificLocation", headerName: "Specific Location", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "locationType", headerName: "Location Type", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="LOCATIONS" subtitle="Managing Locations" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={locations}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Location;
