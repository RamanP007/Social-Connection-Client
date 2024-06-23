import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { GetReq, isUserLoggedIn, PostReq } from "../helpers";
import { toast } from "react-toastify";
import { ErrorMessage, Formik } from "formik";
import { LoginvalidationSchema } from "../helpers/yup";
import { useEffect, useState } from "react";
import SessionAlreadyExist from "../components/SessionAlreadyExistpopup";

const defaultTheme = createTheme();

export default function SignInSide() {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const response = await PostReq("auth/sign-in", values);
    if (!response.success) {
      toast.error(response.error);
    } else {
      const response = await GetReq("user/me");
      if (!response.success) {
        toast.error(response.error);
      } else {
        setUserId(response.data);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate("/");
    }
  }, []);

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
              Sign in
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginvalidationSchema}
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
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
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
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs className="cursor-pointer">
                        <Link href="" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid className="cursor-pointer" item>
                        <Link
                          onClick={() => navigate("/register")}
                          href=""
                          variant="body2"
                        >
                          {"Don't have an account? Sign Up"}
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
      <SessionAlreadyExist
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userId={userId}
      />
    </ThemeProvider>
  );
}
