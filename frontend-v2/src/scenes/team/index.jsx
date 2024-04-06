import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [members, setMembers] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editMemberData, setEditMemberData] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    fetch('http://localhost:8081/Member')
      .then(response => response.json())
      .then(data => {
        const newData = data.map((row) => ({
          ...row,
          id: row.GD_id
        }));
        setMembers(newData);
      })
      .catch(error => {
        console.error('Error fetching members:', error);
      });
  };

  const handleDeleteMember = (memberId) => {
    fetch(`http://localhost:8081/deleteMember/${memberId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      fetchMembers();
    })
    .catch(error => {
      console.error('Error deleting member:', error);
    });
  };

  const handleEditMember = (memberId) => {
    const memberToEdit = members.find(member => member.id === memberId);
    setEditMemberData(memberToEdit);
    setOpenEditDialog(true);
  };

  const handleEditConfirm = () => {
    if (!editMemberData) return;

    fetch(`http://localhost:8081/updateMember/${editMemberData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editMemberData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to update member.');
        }
      })
      .then((data) => {
        console.log('Member updated:', data);
        setOpenEditDialog(false);
        fetchMembers();
      })
      .catch((err) => {
        console.error('Error updating member:', err);
        alert('Error updating member. Please try again.');
      });
  };

  const columns = [
    { field: "GD_id", headerName: "ID", flex: 1 },
    { field: "Name", headerName: "Name", flex: 1 },
    { field: "Email", headerName: "Email", flex: 1 },
    { field: "History", headerName: "History", flex: 1 },
    { field: "Department", headerName: "Department", flex: 1 },
    { field: "Manager", headerName: "Manager", flex: 1 },
    { 
      field: "Permissions",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row }) => {
        const { Permissions } = row;
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              Permissions === "Admin"
                ? colors.greenAccent[600]
                : Permissions === "Manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {Permissions === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {Permissions === "Manager" && <SecurityOutlinedIcon />}
            {Permissions === "User" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {Permissions}
            </Typography>
          </Box>
        );
      },      
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between">
          <IconButton color="error" onClick={() => handleDeleteMember(params.row.GD_id)}>
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleEditMember(params.row.GD_id)}>
            <EditIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box m="20px">
      <Header title="CURRENT USERS" subtitle="Managing the Team Members" />
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
          rows={members}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      {/* Edit Member Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Member</DialogTitle>
        <DialogContent>
          {editMemberData && (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="editName"
                name="Name"
                label="Name"
                fullWidth
                value={editMemberData.Name}
                onChange={(e) => setEditMemberData({ ...editMemberData, Name: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editEmail"
                name="Email"
                label="Email"
                fullWidth
                value={editMemberData.Email}
                onChange={(e) => setEditMemberData({ ...editMemberData, Email: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editHistory"
                name="History"
                label="History"
                fullWidth
                value={editMemberData.History}
                onChange={(e) => setEditMemberData({ ...editMemberData, History: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editDepartment"
                name="Department"
                label="Department"
                fullWidth
                value={editMemberData.Department}
                onChange={(e) => setEditMemberData({ ...editMemberData, Department: e.target.value })}
              />
              <TextField
                margin="dense"
                id="editManager"
                name="Manager"
                label="Manager"
                fullWidth
                value={editMemberData.Manager}
                onChange={(e) => setEditMemberData({ ...editMemberData, Manager: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel id="editPermissions-label">Access Level</InputLabel>
                <Select
                  labelId="editPermissions-label"
                  id="editPermissions"
                  name="Permissions"
                  value={editMemberData.Permissions}
                  label="Access Level"
                  onChange={(e) => setEditMemberData({ ...editMemberData, Permissions: e.target.value })}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </FormControl>
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

export default Team;
