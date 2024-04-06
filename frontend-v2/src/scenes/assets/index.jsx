import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";

const Asset = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [assetData, setAssetData] = useState([]);
  const [checkoutAssetID, setCheckoutAssetID] = useState(null);
  const [checkoutMemberID, setCheckoutMemberID] = useState('');
  const [checkoutLocationID, setCheckoutLocationID] = useState('');
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const [editAssetData, setEditAssetData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    fetchAssetData();
  }, []);

  const fetchAssetData = () => {
    fetch('http://localhost:8081/Asset')
      .then((res) => res.json())
      .then((data) => {
        const newData = data.map((row) => ({
          ...row,
          id: row.Asset_ID
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

  const handleCheckOut = (assetID) => {
    setCheckoutAssetID(assetID);
    setOpenCheckoutDialog(true);
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

  const handleCheckoutConfirm = () => {
    // Check if the member or location IDs are empty
    if (!checkoutMemberID || !checkoutLocationID) {
      alert("Please enter both member ID and location ID.");
      return;
    }
  
    fetch(`http://localhost:8081/checkoutAsset/${checkoutAssetID}/${checkoutMemberID}/${checkoutLocationID}`, {
      method: 'PUT',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to checkout asset. Member or location does not exist.");
        }
      })
      .then((data) => {
        console.log(data.message);
        setCheckoutAssetID(null);
        setCheckoutMemberID('');
        setCheckoutLocationID('');
        setOpenCheckoutDialog(false);
        fetchAssetData();
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  const handleEditAsset = (assetID) => {
    // Find the asset to edit from assetData using assetID
    const assetToEdit = assetData.find(asset => asset.Asset_ID === assetID);
    setEditAssetData(assetToEdit);
    setOpenEditDialog(true);
  };

  const handleEditConfirm = () => {
    if (!editAssetData) return;

    fetch(`http://localhost:8081/updateAsset/${editAssetData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editAssetData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to update asset.');
        }
      })
      .then((data) => {
        console.log('Asset updated:', data);
        setOpenEditDialog(false);
        fetchAssetData();
      })
      .catch((err) => {
        console.error('Error updating asset:', err);
        alert('Error updating asset. Please try again.');
      });
  };

  const columns = [
    { field: "Asset_ID", headerName: "Asset ID", flex: 1 },
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
      width: 200,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between">
          {params.row.Member_ID ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCheckIn(params.row.Asset_ID)}
              style={{ margin: '0 8px' }}
            >
              Checkin
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCheckOut(params.row.Asset_ID)}
              style={{ margin: '0 8px' }}
            >
              Checkout
            </Button>
          )}
          <IconButton color="error" onClick={() => handleDelete(params.row.Asset_ID)}>
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleEditAsset(params.row.Asset_ID)}>
            <EditIcon />
          </IconButton>
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

      {/* Checkout Dialog */}
      <Dialog open={openCheckoutDialog} onClose={() => setOpenCheckoutDialog(false)}>
        <DialogTitle>Checkout Asset</DialogTitle>
        <DialogContent>
          <Typography>Enter Name of Employee:</Typography>
          <TextField
            value={checkoutMemberID}
            onChange={(e) => setCheckoutMemberID(e.target.value)}
            fullWidth
          />
          <Typography>Select Location:</Typography>
          <TextField
            value={checkoutLocationID}
            onChange={(e) => setCheckoutLocationID(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCheckoutDialog(false)}>Cancel</Button>
          <Button onClick={handleCheckoutConfirm} variant="contained" color="primary">Checkout</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Asset Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Asset</DialogTitle>
        <DialogContent>
          {/* Render input fields with current asset data for editing */}
          {editAssetData && (
            <>
              <Typography>Asset Name:</Typography>
              <TextField
                value={editAssetData.Asset_Name}
                onChange={(e) => setEditAssetData({ ...editAssetData, Asset_Name: e.target.value })}
                fullWidth
              />
              <Typography>Asset Tag:</Typography>
              <TextField
                value={editAssetData.Asset_Tag}
                onChange={(e) => setEditAssetData({ ...editAssetData, Asset_Tag: e.target.value })}
                fullWidth
              />
              <Typography>Version History:</Typography>
              <TextField
                value={editAssetData.VersionHistory}
                onChange={(e) => setEditAssetData({ ...editAssetData, VersionHistory: e.target.value })}
                fullWidth
              />
              <Typography>Current Image:</Typography>
              <TextField
                value={editAssetData.Current_Image}
                onChange={(e) => setEditAssetData({ ...editAssetData, Current_Image: e.target.value })}
                fullWidth
              />
              <Typography>Model:</Typography>
              <TextField
                value={editAssetData.Model}
                onChange={(e) => setEditAssetData({ ...editAssetData, Model: e.target.value })}
                fullWidth
              />
              <Typography>Type:</Typography>
              <TextField
                value={editAssetData.Type}
                onChange={(e) => setEditAssetData({ ...editAssetData, Type: e.target.value })}
                fullWidth
              />
              <Typography>Category:</Typography>
              <TextField
                value={editAssetData.Category}
                onChange={(e) => setEditAssetData({ ...editAssetData, Category: e.target.value })}
                fullWidth
              />
              <Typography>Status:</Typography>
              <TextField
                value={editAssetData.Status}
                onChange={(e) => setEditAssetData({ ...editAssetData, Status: e.target.value })}
                fullWidth
              />
              <Typography>Purchase Date:</Typography>
              <TextField
                value={editAssetData.Purchase_Date}
                onChange={(e) => setEditAssetData({ ...editAssetData, Purchase_Date: e.target.value })}
                fullWidth
              />
              <Typography>Cost:</Typography>
              <TextField
                value={editAssetData.Cost}
                onChange={(e) => setEditAssetData({ ...editAssetData, Cost: e.target.value })}
                fullWidth
              />
              <Typography>Deployed:</Typography>
              <TextField
                value={editAssetData.Deployed}
                onChange={(e) => setEditAssetData({ ...editAssetData, Deployed: e.target.value })}
                fullWidth
              />
              {/* Add more fields for editing as needed */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditConfirm} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Asset;
