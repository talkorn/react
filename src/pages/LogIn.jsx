import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import logInValidationSchema from "../validation/logInValidation";
import axios from "axios";
import useLoggedIn from "../hooks/useLoggedIn";
import { Alert } from "@mui/material";

const LogIn = () => {
  const loggedIn = useLoggedIn();
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({ email: "", password: "" });
  const [buttonValid, setButtonValid] = useState(false);
  useEffect(() => {
    const joiResponse = logInValidationSchema(inputState);
    setInputsErrorsState(joiResponse);
    console.log("inputsErrorsState", inputsErrorsState);
    if (!inputsErrorsState && inputState.email && inputState.password) {
      setButtonValid(true);
    }
  }, [inputState]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (inputsErrorsState) {
        return;
      }
      const { data } = await axios.post("/users/login", inputState);
      console.log("data", data);
      localStorage.setItem("token", data.token);
      loggedIn();
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("login error", err);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={inputState.email}
            onChange={handleInputChange}
          />
          {inputsErrorsState && inputState.email && inputsErrorsState.email && (
            <Alert severity="warning">
              {inputsErrorsState.email.map((item) => (
                <div key={"email-errors" + item}>{item}</div>
              ))}
            </Alert>
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
            value={inputState.password}
            onChange={handleInputChange}
          />
          {inputsErrorsState &&
            inputState.password &&
            inputsErrorsState.password && (
              <Alert severity="warning">
                {inputsErrorsState.password.map((item) => (
                  <div key={"password-errors" + item}>{item}</div>
                ))}
              </Alert>
            )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            disabled={!buttonValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default LogIn;
