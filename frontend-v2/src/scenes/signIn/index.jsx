import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import Dashboard from "../dashboard";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (username === "admin" && password === "password") {
      // Authentication successful, navigate to dashboard
      navigate(Dashboard);
      <Link to={Dashboard} />
    } else {
      // Authentication failed, display error message
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" mb={4}>
        Sign In
      </Typography>
      <Box
        sx={{
          width: "300px",
        }}
      >
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" sx={{ marginBottom: "10px" }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignIn}
          sx={{ marginTop: "20px" }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
