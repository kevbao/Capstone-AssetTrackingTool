import React from 'react';
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";

const Form = () => {
  const handleFormSubmit = (values, { resetForm, setSubmitting }) => {
    // Set the form data
    const formData = {
      GD_id: values.GD_id,
      Name: values.Name,
      Permissions: values.Permissions,
      Email: values.Email,
      History: values.History,
      Department: values.Department,
      Manager: values.Manager
    };

    fetch('http://localhost:8081/addMember', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
      resetForm(); // Reset form after successful submission
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setSubmitting(false); // Reset form submission state
    });
  };

  return (
    <Box m="20px">
      <Header title="ADD MEMBER" subtitle="Add a New Member" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={memberSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="GD_id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.GD_id}
                name="GD_id"
                error={!!touched.GD_id && !!errors.GD_id}
                helperText={touched.GD_id && errors.GD_id}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Name}
                name="Name"
                error={!!touched.Name && !!errors.Name}
                helperText={touched.Name && errors.Name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                select
                fullWidth
                variant="filled"
                label="Permissions"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Permissions}
                name="Permissions"
                error={!!touched.Permissions && !!errors.Permissions}
                helperText={touched.Permissions && errors.Permissions}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Email}
                name="Email"
                error={!!touched.Email && !!errors.Email}
                helperText={touched.Email && errors.Email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="History"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.History}
                name="History"
                error={!!touched.History && !!errors.History}
                helperText={touched.History && errors.History}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Department}
                name="Department"
                error={!!touched.Department && !!errors.Department}
                helperText={touched.Department && errors.Department}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Manager"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Manager}
                name="Manager"
                error={!!touched.Manager && !!errors.Manager}
                helperText={touched.Manager && errors.Manager}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting} // Disable button during submission
              >
                {isSubmitting ? 'Adding...' : 'Add Member'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const memberSchema = yup.object().shape({
  GD_id: yup.string().required("Required"),
  Name: yup.string().required("Required"),
  Permissions: yup.string().required("Required"),
  Email: yup.string().email("Invalid email").required("Required"),
  History: yup.string().required("Required"),
  Department: yup.string().required("Required"),
  Manager: yup.string().required("Required"),
});

const initialValues = {
  GD_id: "",
  Name: "",
  Permissions: "",
  Email: "",
  History: "",
  Department: "",
  Manager: "",
};

export default Form;
