// Needs more work



import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PersonIcon from "@mui/icons-material/Person";

const UserProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box
        bgcolor={colors.primary[400]}
        p="20px"
        borderRadius="5px"
        textAlign="center"
      >
        <PersonIcon sx={{ fontSize: 80, color: colors.greenAccent[600] }} />
        <Typography variant="h4" color={colors.grey[100]} mt={2}>
          User Profile
        </Typography>
        <Box mt={2}>
          <Typography variant="body1" color={colors.grey[100]}>
            Name: John Doe
          </Typography>
          <Typography variant="body1" color={colors.grey[100]}>
            Email: john.doe@example.com
          </Typography>
          <Typography variant="body1" color={colors.grey[100]}>
            Role: Administrator
          </Typography>
          {/* Add more user information here */}
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
