import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    id: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // Handle success or error response from the server
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="ID (Numbers only)"
          name="id"
          type="number"
          value={formData.id}
          onChange={handleInputChange}
        />
        {error && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ mt: 2 }}
          >
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Create Account
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account? <RouterLink to="/login">Login</RouterLink>
      </Typography>
    </Box>
  );
};

export default SignupPage;

