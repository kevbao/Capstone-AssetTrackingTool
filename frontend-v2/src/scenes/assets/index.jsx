import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from 'react';

const Asset = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [assetData, setAssetData] = useState([]);

  useEffect(() => {
    fetchAssetData();
  }, []);

  const fetchAssetData = () => {
    fetch('http://localhost:8081/Asset')
      .then((res) => res.json())
      .then((data) => {
        // add unique id property to each row
        const newData = data.map((row) => ({
          ...row,
          id: row.Asset_ID // Asset_ID is unique
        }));
        setAssetData(newData);
      })
      .catch((err) => console.log(err));
  };
  
  const handleCheckIn = (assetID) => {
    fetch(`http://localhost:8081/checkinAsset/${assetID}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        fetchAssetData();
      })
      .catch((err) => console.error(err));
  };

  const handleCheckOut = (assetID, memberID) => {
    fetch(`http://localhost:8081/checkoutAsset/${assetID}/${memberID}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        fetchAssetData();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (assetID) => {
    console.log(`Delete button clicked for asset ID: ${assetID}`);
    fetch(`http://localhost:8081/deleteAsset/${assetID}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        fetchAssetData();
      })
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: "Asset_ID", headerName: "Asset ID" },
    { field: "Asset_Name", headerName: "Asset Name", flex: 1 },
    { field: "Asset_Tag", headerName: "Asset Tag", flex: 1 },
    { field: "VersionHistory", headerName: "Version History", flex: 1 },
    { field: "Current_Image", headerName: "Current Image", flex: 1 },
    { field: "Model", headerName: "Model", flex: 1 },
    { field: "Type", headerName: "Type", flex: 1 },
    { field: "Category", headerName: "Category", flex: 1 },
    { field: "Status", headerName: "Status", flex: 1 },
    { field: "Purchase_Date", headerName: "Purchase Date", flex: 1 },
    { field: "Cost", headerName: "Cost", flex: 1 },
    { field: "Deployed", headerName: "Deployed", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCheckIn(params.row.Asset_ID)}
            style={{ padding: 2 }} // Add margin-right for space
          >
            In
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCheckOut(params.row.Asset_ID)}
            style={{ margin: '0 8px' }} // Add margin for space
          >
            Out
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row.Asset_ID)}
            style={{ padding: 2 }} // Add margin-left for space
          >
            Delete
          </Button>
        </Box>

      ),
    },
  ];

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
            display: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={assetData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
        />
      </Box>
    </Box>
  );
};

export default Asset;
