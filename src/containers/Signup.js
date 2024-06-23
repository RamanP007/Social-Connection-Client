import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import { RegistervalidationSchema } from "../helpers/yup";
import { PostReq } from "../helpers";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

export default function SignInSide() {
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const response = await PostReq("auth/sign-up", values);
    if (!response.success) {
      toast.error(response.error);
    } else {
      navigate("/");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="left-dsn" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={RegistervalidationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => {
                const { values, handleSubmit, errors, handleChange } = formik;

                return (
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      autoFocus
                      id="fullname"
                      label="Full Name"
                      name="fullname"
                      autoComplete="fullname"
                      onChange={(e) => handleChange(e)}
                      value={values.fullname}
                    />
                    {errors.fullname && (
                      <ErrorMessage
                        name="fullname"
                        component="div"
                        className="error"
                      />
                    )}
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => handleChange(e)}
                      value={values.email}
                    />
                    {errors.email && (
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error"
                      />
                    )}
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) => handleChange(e)}
                      value={values.password}
                    />
                    {errors.password && (
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                      />
                    )}
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="current-password"
                      onChange={(e) => handleChange(e)}
                      value={values.confirmPassword}
                    />
                    {errors.confirmPassword && (
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="error"
                      />
                    )}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                    <Grid container>
                      <Grid item>
                        <Link
                          onClick={() => navigate("/login")}
                          variant="body2"
                          className="cursor-pointer"
                          href=""
                        >
                          {"Already have an account? Sign In"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                );
              }}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
