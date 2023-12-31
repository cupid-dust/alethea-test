"use client";

import type { FC } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Box, Button, FormHelperText, TextField } from "@mui/material";
import { useAuth } from "@app/hooks";
import { useRouter } from "next/navigation";

const LoginJWT: FC = (props) => {
  const { login } = useAuth() as any;
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: "test@alethea.ai",
        password: "Password123!",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting }
      ): Promise<void> => {
        try {
          await login(values.email, values.password);

          setStatus({ success: true });
          setSubmitting(false);
          router.push("/dashboard/customers");
        } catch (err: any) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }): JSX.Element => (
        <form noValidate onSubmit={handleSubmit} {...props}>
          <TextField
            autoFocus
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Alert severity="info">
              <div>
                Use <b>test@alethea.ai</b> and password <b>Password123!</b>
              </div>
            </Alert>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginJWT;
