import React from 'react';
import { Box, Typography } from "@mui/material";

const PersonDetails = ({ person }) => {
  return (
    <Box m="20px">
      <Typography variant="h2">Person Details</Typography>
      <Typography>Name: {person.Name}</Typography>
      <Typography>Email: {person.Email}</Typography>
      <Typography>History: {person.History}</Typography>
      <Typography>Department: {person.Department}</Typography>
      <Typography>Manager: {person.Manager}</Typography>
      <Typography>Access Level: {person.Permissions}</Typography>
    </Box>
  );
};

export default PersonDetails;
