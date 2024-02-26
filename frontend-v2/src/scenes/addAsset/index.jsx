import React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";

const Form = () => {
  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values); // Log the form values for now
    
    // Reset the form data after successful submission
    resetForm();
  };

  return (
    <Box m="20px">
      <Header title="ADD ASSET" subtitle="Add a New Asset" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={assetSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm, // Access the resetForm function from Formik
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            >
              {/* Asset_Name */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Asset Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.assetName}
                name="assetName"
                error={!!touched.assetName && !!errors.assetName}
                helperText={touched.assetName && errors.assetName}
                sx={{ gridColumn: "span 1" }}

              />
              {/* Asset_Tag */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Asset Tag"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.assetTag}
                name="assetTag"
                error={!!touched.assetTag && !!errors.assetTag}
                helperText={touched.assetTag && errors.assetTag}
                sx={{ gridColumn: "span 1" }}

              />
              {/* VersionHistory */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Version History"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.versionHistory}
                name="versionHistory"
                error={!!touched.versionHistory && !!errors.versionHistory}
                helperText={touched.versionHistory && errors.versionHistory}
              />
              {/* Current_Image */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Current Image"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.currentImage}
                name="currentImage"
                error={!!touched.currentImage && !!errors.currentImage}
                helperText={touched.currentImage && errors.currentImage}
              />
              {/* Model */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Model"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.model}
                name="model"
                error={!!touched.model && !!errors.model}
                helperText={touched.model && errors.model}
              />
              {/* Type */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="type"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
              />
              {/* Category */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
              />
              {/* Status */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
              />
              {/* Purchase_Date */}
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Purchase Date"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.purchaseDate}
                name="purchaseDate"
                error={!!touched.purchaseDate && !!errors.purchaseDate}
                helperText={touched.purchaseDate && errors.purchaseDate}
              />
              {/* Cost */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Cost"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cost}
                name="cost"
                error={!!touched.cost && !!errors.cost}
                helperText={touched.cost && errors.cost}
              />
              {/* Deployed */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Deployed"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.deployed}
                name="deployed"
                error={!!touched.deployed && !!errors.deployed}
                helperText={touched.deployed && errors.deployed}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Asset
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const assetSchema = yup.object().shape({
  assetName: yup.string().required("required"),
  assetTag: yup.string().required("required"),
  versionHistory: yup.string().required("required"),
  currentImage: yup.string().required("required"),
  model: yup.string().required("required"),
  type: yup.string().required("required"),
  category: yup.string().required("required"),
  status: yup.string().required("required"),
  purchaseDate: yup.date().required("required"),
  cost: yup.number().required("required"),
  deployed: yup.string().required("required"),
});

const initialValues = {
  assetName: "",
  assetTag: "",
  versionHistory: "",
  currentImage: "",
  model: "",
  type: "",
  category: "",
  status: "",
  purchaseDate: "",
  cost: "",
  deployed: "",
};

export default Form;
