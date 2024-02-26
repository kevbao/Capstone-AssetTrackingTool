import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Asset = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "assetName", headerName: "Asset Name", flex: 1 },
    { field: "assetTag", headerName: "Asset Tag", flex: 1 },
    { field: "versionHistory", headerName: "Version History", flex: 1 },
    { field: "currentImage", headerName: "Current Image", flex: 1 },
    { field: "model", headerName: "Model", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "purchaseDate", headerName: "Purchase Date", flex: 1 },
    { field: "cost", headerName: "Cost", flex: 1 },
    { field: "deployed", headerName: "Deployed", flex: 1 },
  ];

  const mockDataAsset = [
    {
      id: 1,
      assetName: "Radio 1",
      assetTag: "Tag 1",
      versionHistory: "Version 1",
      currentImage: "Image 1",
      model: "Model 1",
      type: "Type 1",
      category: "Category 1",
      status: "Available",
      purchaseDate: "2023-01-01",
      cost: "100",
      deployed: "No",
    },
    // Other mock data items...
  ];

  const handleCheckIn = () => {
    // Implement check-in functionality
    console.log("Check-In clicked");
  };

  const handleCheckOut = () => {
    // Implement check-out functionality
    console.log("Check-Out clicked");
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log("Delete clicked");
  };

  return (
    <Box m="20px">
      <Header title="ASSET" subtitle="Managing Assets" />
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
          rows={mockDataAsset}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleCheckIn}>
          Check-In
        </Button>
        <Button variant="contained" color="primary" onClick={handleCheckOut}>
          Check-Out
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default Asset;
