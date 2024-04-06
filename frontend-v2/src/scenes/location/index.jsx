import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Header from "../../components/Header";

const Location = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [locations, setLocations] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [locationFormData, setLocationFormData] = useState({
    Name: "",
    GD_specific_location: "",
    Description: "",
    LocationType: ""
  });
  const [editLocationData, setEditLocationData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = () => {
    fetch('http://localhost:8081/Location')
      .then(response => response.json())
      .then(data => {
        const newData = data.map((row) => ({
          ...row,
          id: row.Location_id
        }));
        setLocations(newData);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
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
    setLocationFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    fetch('http://localhost:8081/addLocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(locationFormData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      fetchLocations();
      handleCloseDialog();
    })
    .catch(error => {
      console.error('Error adding location:', error);
    });
  };

  const handleDeleteLocation = (locationId) => {
    fetch(`http://localhost:8081/deleteLocation/${locationId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      fetchLocations();
    })
    .catch(error => {
      console.error('Error deleting location:', error);
    });
  };

  const handleEditLocation = (locationId) => {
    const locationToEdit = locations.find(location => location.id === locationId);
    setEditLocationData(locationToEdit);
    setOpenEditDialog(true);
  };

  const handleEditConfirm = () => {
    if (!editLocationData) return;

    fetch(`http://localhost:8081/updateLocation/${editLocationData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editLocationData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to update location.');
        }
      })
      .then((data) => {
        console.log('Location updated:', data);
        setOpenEditDialog(false);
        fetchLocations();
      })
      .catch((err) => {
        console.error('Error updating location:', err);
        alert('Error updating location. Please try again.');
      });
  };

  const columns = [
    { field: "Name", headerName: "Name", flex: 1 },
    { field: "GD_specific_location", headerName: "Specific Location", flex: 1 },
    { field: "Description", headerName: "Description", flex: 1 },
    { field: "LocationType", headerName: "Location Type", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between">
          <IconButton
            color="error"
            onClick={() => handleDeleteLocation(params.row.id)}
          >
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleEditLocation(params.row.id)}>
            <EditIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="LOCATIONS" subtitle="Managing Locations" />
      <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ mb: 2 }}>
        Add Location
      </Button>
      <Box
        m="0 0 0 0"
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
          rows={locations}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
        />
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Location</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            name="Name"
            label="Name"
            fullWidth
            value={locationFormData.Name}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            id="GD_specific_location"
            name="GD_specific_location"
            label="Specific Location"
            fullWidth
            value={locationFormData.GD_specific_location}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            id="Description"
            name="Description"
            label="Description"
            fullWidth
            value={locationFormData.Description}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            id="LocationType"
            name="LocationType"
            label="Location Type"
            fullWidth
            value={locationFormData.LocationType}
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
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Location</DialogTitle>
        <DialogContent>
          {editLocationData && (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="editName"
                name="Name"
                label="Name"
                fullWidth
                value={editLocationData.Name}
                onChange={(e) => setEditLocationData({ ...editLocationData, Name: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editGD_specific_location"
                name="GD_specific_location"
                label="Specific Location"
                fullWidth
                value={editLocationData.GD_specific_location}
                onChange={(e) => setEditLocationData({ ...editLocationData, GD_specific_location: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editDescription"
                name="Description"
                label="Description"
                fullWidth
                value={editLocationData.Description}
                onChange={(e) => setEditLocationData({ ...editLocationData, Description: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editLocationType"
                name="LocationType"
                label="Location Type"
                fullWidth
                value={editLocationData.LocationType}
                onChange={(e) => setEditLocationData({ ...editLocationData, LocationType: e.target.value })}
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

export default Location;
