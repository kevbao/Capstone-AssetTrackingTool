import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Accessory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "model", headerName: "Model", flex: 1 },
    { field: "total", headerName: "Total", flex: 1 },
    { field: "numCheckedOut", headerName: "Checked Out", flex: 1 },
    { field: "cost", headerName: "Cost", flex: 1 },
  ];

  const mockDataAccessory = [
    {
      id: 1,
      name: "Antenna",
      description: "High gain antenna",
      category: "Antennas",
      model: "ANT100",
      total: 50,
      numCheckedOut: 10,
      cost: 25,
    },
    {
      id: 2,
      name: "Battery",
      description: "Long life battery",
      category: "Batteries",
      model: "BAT200",
      total: 100,
      numCheckedOut: 20,
      cost: 30,
    },
    {
      id: 3,
      name: "Earphone",
      description: "Clear sound earphone",
      category: "Earphones",
      model: "EAR300",
      total: 80,
      numCheckedOut: 15,
      cost: 20,
    },
    {
      id: 4,
      name: "Charger",
      description: "Fast charging charger",
      category: "Chargers",
      model: "CHA400",
      total: 60,
      numCheckedOut: 12,
      cost: 35,
    },
    {
      id: 5,
      name: "Case",
      description: "Durable radio case",
      category: "Cases",
      model: "CAS500",
      total: 70,
      numCheckedOut: 14,
      cost: 40,
    },
  ];

  return (
    <Box m="20px">
      <Header title="ACCESSORY" subtitle="Managing Accessories" />
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
          rows={mockDataAccessory}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Accessory;
