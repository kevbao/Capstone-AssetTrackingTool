import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values, {resetForm}) => {
    console.log(values); // Log the form values for now

    resetForm();

  };

  return (
    <Box m="20px">
      <Header title="ADD MEMBER" subtitle="Add a New Member" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}

              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}

              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Permissions"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.permissions}
                name="permissions"
                error={!!touched.permissions && !!errors.permissions}
                helperText={touched.permissions && errors.permissions}
                sx={{ gridColumn: "span 2" }}

              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="History"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.history}
                name="history"
                error={!!touched.history && !!errors.history}
                helperText={touched.history && errors.history}
                sx={{ gridColumn: "span 2" }}

              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.department}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Manager"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.manager}
                name="manager"
                error={!!touched.manager && !!errors.manager}
                helperText={touched.manager && errors.manager}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Check-in Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.check_in_time}
                name="check_in_time"
                error={!!touched.check_in_time && !!errors.check_in_time}
                helperText={touched.check_in_time && errors.check_in_time}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Member
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  GD_id: yup.string().required("required"),
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  permissions: yup.string().required("required"),
  history: yup.string().required("required"),
  department: yup.string().required("required"),
  manager: yup.string().required("required"),
  check_in_time: yup.string().required("required"),
});

const initialValues = {
  GD_id: "",
  firstName: "",
  lastName: "",
  email: "",
  permissions: "",
  history: "",
  department: "",
  manager: "",
  check_in_time: "",
};

export default Form;
