import React from 'react';
import { Box, Typography } from "@mui/material";

const AssetDetails = ({ asset }) => {
  return (
    <Box m="20px">
      <Typography variant="h2">Asset Details</Typography>
      <Typography>Asset ID: {asset.Asset_ID}</Typography>
      <Typography>Asset Name: {asset.Asset_Name}</Typography>
      <Typography>Asset Tag: {asset.Asset_Tag}</Typography>
      <Typography>Version History: {asset.VersionHistory}</Typography>
      <Typography>Current Image: {asset.Current_Image}</Typography>
      <Typography>Model: {asset.Model}</Typography>
      <Typography>Type: {asset.Type}</Typography>
      <Typography>Category: {asset.Category}</Typography>
      <Typography>Status: {asset.Status}</Typography>
      <Typography>Purchase Date: {asset.Purchase_Date}</Typography>
      <Typography>Cost: {asset.Cost}</Typography>
      <Typography>Deployed: {asset.Deployed}</Typography>
      {asset.Member_ID && <Typography>Member ID: {asset.Member_ID}</Typography>}
      {asset.Location_Name && <Typography>Location: {asset.Location_Name}</Typography>}
    </Box>
  );
};

export default AssetDetails;
