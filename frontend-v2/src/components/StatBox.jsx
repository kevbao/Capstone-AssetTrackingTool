import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
//import ProgressCircle from "./ProgressCircle";
import { Link as RouterLink } from "react-router-dom";

const StatBox = ({ title, subtitle, icon, progress, viewAll, viewAllUrl }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
      </Box>

      <Typography
        variant="h5"
        fontStyle="italic"
        sx={{ color: colors.greenAccent[600] }}
      >
        <RouterLink to={viewAllUrl} style={{ color: colors.greenAccent[600] }}>
          {viewAll}
        </RouterLink>
      </Typography>
    </Box>
  );
};

export default StatBox;
