import { Box, Button, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from 'react';

const Asset = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [assetData, setAssetData] = useState([]);
  const [checkoutAssetID, setCheckoutAssetID] = useState(null);
  const [checkoutMemberID, setCheckoutMemberID] = useState('');
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);

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
    fetch(`http://localhost:8081/checkoutAsset/${checkoutAssetID}/${checkoutMemberID}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setCheckoutAssetID(null);
        setCheckoutMemberID('');
        setOpenCheckoutDialog(false);
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
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row.Asset_ID)}
            style={{ padding: 2 }}
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

      {/* Checkout Dialog */}
      <Dialog open={openCheckoutDialog} onClose={() => setOpenCheckoutDialog(false)}>
        <DialogTitle>Checkout Asset</DialogTitle>
        <DialogContent>
          <Typography>Enter Member ID:</Typography>
          <TextField
            value={checkoutMemberID}
            onChange={(e) => setCheckoutMemberID(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCheckoutDialog(false)}>Cancel</Button>
          <Button onClick={handleCheckoutConfirm} variant="contained" color="primary">Checkout</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Asset;
