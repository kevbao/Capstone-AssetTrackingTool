import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";


const Accessory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [accessories, setAccessories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [accessoryFormData, setAccessoryFormData] = useState({
    name: "",
    description: "",
    category: "",
    model: "",
    total: 0,
    numCheckedOut: 0,
    cost: 0
  });
  const [editAccessoryData, setEditAccessoryData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = () => {
    fetch('http://localhost:8081/accessory')
      .then(response => response.json())
      .then(data => {
        const newData = data.map((row) => ({
          ...row,
          id: row.Accessory_id
        }));
        setAccessories(newData);
      })
      .catch(error => {
        console.error('Error fetching accessories:', error);
      });
  };
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAccessoryFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    fetch('http://localhost:8081/addAccessory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(accessoryFormData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      fetchAccessories();
      handleCloseDialog();
    })
    .catch(error => {
      console.error('Error adding accessory:', error);
    });
  };

  const handleDeleteAccessory = (accessoryId) => {
    fetch(`http://localhost:8081/deleteAccessory/${accessoryId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      fetchAccessories();
    })
    .catch(error => {
      console.error('Error deleting accessory:', error);
    });
  };

  const handleEditAccessory = (accessoryId) => {
    const accessoryToEdit = accessories.find(accessory => accessory.id === accessoryId);
    setEditAccessoryData(accessoryToEdit);
    setOpenEditDialog(true);
  };

  const handleEditConfirm = () => {
    if (!editAccessoryData) return;

    fetch(`http://localhost:8081/updateAccessory/${editAccessoryData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editAccessoryData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to update accessory.');
        }
      })
      .then((data) => {
        console.log('Accessory updated:', data);
        setOpenEditDialog(false);
        fetchAccessories();
      })
      .catch((err) => {
        console.error('Error updating accessory:', err);
        alert('Error updating accessory. Please try again.');
      });
  };

  const columns = [
    { field: "Name", headerName: "Name", flex: 1 },
    { field: "Description", headerName: "Description", flex: 1 },
    { field: "Category", headerName: "Category", flex: 1 },
    { field: "Model", headerName: "Model", flex: 1 },
    { field: "Total", headerName: "Total", flex: 1 },
    { field: "numCheckedOut", headerName: "Number Checked Out", flex: 1 },
    { field: "cost", headerName: "Cost", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between">
          <IconButton
            color="error"
            onClick={() => handleDeleteAccessory(params.row.id)}
          >
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleEditAccessory(params.row.id)}>
            <EditIcon />
          </IconButton>
        </Box>
      ),
    }
  ];

  return (
    <Box m="20px">
      <Header title="ACCESSORY" subtitle="Managing Accessories" />
      <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ mb: 2 }}>
        Add Accessory
      </Button>
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={accessories}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Accessory</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            name="Name"
            label="Name"
            fullWidth
            value={accessoryFormData.Name}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            id="Description"
            name="Description"
            label="Description"
            fullWidth
            value={accessoryFormData.Description}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            id="Category"
            name="Category"
            label="Category"
            fullWidth
            value={accessoryFormData.Category}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            id="Model"
            name="Model"
            label="Model"
            fullWidth
            value={accessoryFormData.Model}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            id="Total"
            name="Total"
            label="Total"
            type="number"
            fullWidth
            value={accessoryFormData.Total}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            id="numCheckedOut"
            name="numCheckedOut"
            label="Checked Out"
            type="number"
            fullWidth
            value={accessoryFormData.numCheckedOut}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            id="cost"
            name="cost"
            label="Cost"
            type="number"
            fullWidth
            value={accessoryFormData.cost}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Accessory Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Accessory</DialogTitle>
        <DialogContent>
          {editAccessoryData && (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="editName"
                name="Name"
                label="Name"
                fullWidth
                value={editAccessoryData.Name}
                onChange={(e) => setEditAccessoryData({ ...editAccessoryData, Name: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editDescription"
                name="Description"
                label="Description"
                fullWidth
                value={editAccessoryData.Description}
                onChange={(e) => setEditAccessoryData({ ...editAccessoryData, Description: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editCategory"
                name="Category"
                label="Category"
                fullWidth
                value={editAccessoryData.Category}
                onChange={(e) => setEditAccessoryData({ ...editAccessoryData, Category: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editModel"
                name="Model"
                label="Model"
                fullWidth
                value={editAccessoryData.Model}
                onChange={(e) => setEditAccessoryData({ ...editAccessoryData, Model: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editTotal"
                name="Total"
                label="Total"
                type="number"
                fullWidth
                value={editAccessoryData.Total}
                onChange={(e) => setEditAccessoryData({ ...editAccessoryData, Total: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editNumCheckedOut"
                name="numCheckedOut"
                label="Checked Out"
                type="number"
                fullWidth
                value={editAccessoryData.numCheckedOut}
                onChange={(e) => setEditAccessoryData({ ...editAccessoryData, numCheckedOut: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editCost"
                name="cost"
                label="Cost"
                type="number"
                fullWidth
                value={editAccessoryData.cost}
                onChange={(e) => setEditAccessoryData({ ...editAccessoryData, cost: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditConfirm} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Accessory;
