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
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Stack from "@mui/material/Stack";
import validateSignUpSchema from "../validation/signUpValidaton";
import Alert from "@mui/material/Alert";
import axios from "axios";
import UserComponent from "../components/UserComponent";
import ErrorUserComponent from "../components/ErrorUserComponent";
const SignUpPage = () => {
  const [inputState, setInputState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    /*    biz: "", */
  });
  const [buttonValid, setButtonValid] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  useEffect(() => {
    const joiResponse = validateSignUpSchema(inputState);
    setInputsErrorsState(joiResponse);
    console.log("inputsErrorsState", inputsErrorsState);
    if (
      !inputsErrorsState &&
      inputState.firstName &&
      inputState.lastName &&
      inputState.phone &&
      inputState.country &&
      inputState.email &&
      inputState.password &&
      inputState.city &&
      inputState.street &&
      inputState.houseNumber &&
      inputState.zipCode
    ) {
      setButtonValid(true);
    }
  }, [inputState]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (inputsErrorsState) {
        return;
      }
      await axios.post("users/register", {
        firstName: inputState.firstName,
        email: inputState.email,
        password: inputState.password,
        middleName: inputState.middleName,
        lastName: inputState.lastName,
        phone: inputState.phone,

        imageUrl: inputState.imageUrl,
        imageAlt: inputState.imageAlt,
        state: inputState.state,
        country: inputState.country,
        city: inputState.city,
        street: inputState.street,
        houseNumber: inputState.houseNumber,
        zipCode: inputState.zipCode,
        biz: agreement,
      });
    } catch (err) {
      console.log("error from axios", err.response);
    }
  };

  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    console.log(" newInputState ", newInputState);
  };
  const [agreement, setAgreement] = useState(false);
  const handleChangecheck = (event) => {
    setAgreement(event.target.checked);
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/*    <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={inputState.firstName}
                onChange={handleInputChange}
              /> */}
              <UserComponent
                description="firstName"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
                required={true}
              />
              {/*  <ErrorUserComponent
                description="firstName"
                inputStates={inputState}
                inputsErrorsStates={inputsErrorsState}
              /> */}
              {/*  {inputsErrorsState &&
                inputState.firstName &&
                inputsErrorsState.firstName && (
                  <Alert severity="warning">
                    {inputsErrorsState.firstName.map((item) => (
                      <div key={"firstName-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>

            <Grid item xs={12} sm={6}>
              <UserComponent
                description="middleName"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
                required={false}
              />
              {/*  <TextField
                fullWidth
                id="middleName"
                label="middleName"
                name="middleName"
                autoComplete="middle-name"
                value={inputState.middleName}
                onChange={handleInputChange}
              />
              {inputsErrorsState &&
                inputState.middleName &&
                inputsErrorsState.middleName && (
                  <Alert severity="warning">
                    {inputsErrorsState.middleName.map((item) => (
                      <div key={"middleName-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>

            <Grid item xs={12} sm={6}>
              <UserComponent
                description="lastName"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
                required={true}
              />
              {/*  <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={inputState.lastName}
                onChange={handleInputChange}
              />
              {inputsErrorsState &&
                inputState.lastName &&
                inputsErrorsState.lastName && (
                  <Alert severity="warning">
                    {inputsErrorsState.lastName.map((item) => (
                      <div key={"lastName-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="phone"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
                required={true}
              />
              {/*  <TextField
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                value={inputState.phone}
                onChange={handleInputChange}
              />
              {inputsErrorsState &&
                inputState.phone &&
                inputsErrorsState.phone && (
                  <Alert severity="warning">
                    {inputsErrorsState.phone.map((item) => (
                      <div key={"phone-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="email"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
                required={true}
              />
              {/*    <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={inputState.email}
                onChange={handleInputChange}
              />
              {inputsErrorsState &&
                inputState.email &&
                inputsErrorsState.email && (
                  <Alert severity="warning">
                    {inputsErrorsState.email.map((item) => (
                      <div key={"email-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="password"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
                required={true}
              />
              {/*  <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={inputState.password}
                onChange={handleInputChange}
              />{" "}
              {inputsErrorsState &&
                inputState.password &&
                inputsErrorsState.password && (
                  <Alert severity="warning">
                    {inputsErrorsState.password.map((item) => (
                      <div key={"password-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="imageUrl"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
              />
              {/*  <TextField
                fullWidth
                id="imageUrl"
                label="Image Url"
                name="imageUrl"
                autoComplete="imageUrl"
                value={inputState.imageUrl}
                onChange={handleInputChange}
              />
              {inputsErrorsState &&
                inputState.imageUrl &&
                inputsErrorsState.imageUrl && (
                  <Alert severity="warning">
                    {inputsErrorsState.imageUrl.map((item) => (
                      <div key={"imageUrl-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="imageAlt"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
              />
              {/* <TextField
                fullWidth
                id="imageAlt"
                label="Image Alt"
                name="imageAlt"
                autoComplete="imageAlt"
                value={inputState.imageAlt}
                onChange={handleInputChange}
              />
              {inputsErrorsState &&
                inputState.imageAlt &&
                inputsErrorsState.imageAlt && (
                  <Alert severity="warning">
                    {inputsErrorsState.imageAlt.map((item) => (
                      <div key={"imageAlt-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="state"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
                required={false}
              />
              {/*  <TextField
                fullWidth
                id="state"
                label="State"
                name="state"
                autoComplete="state"
                value={inputState.state}
                onChange={handleInputChange}
              />
              {inputsErrorsState &&
                inputState.state &&
                inputsErrorsState.state && (
                  <Alert severity="warning">
                    {inputsErrorsState.state.map((item) => (
                      <div key={"state-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="country"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
                required={true}
              />
              {/* <TextField
                required
                fullWidth
                id="country"
                label="Country"
                name="country"
                autoComplete="country"
                value={inputState.country}
                onChange={handleInputChange}
              />
              {inputsErrorsState &&
                inputState.country &&
                inputsErrorsState.country && (
                  <Alert severity="warning">
                    {inputsErrorsState.country.map((item) => (
                      <div key={"country-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="city"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
                required={true}
              />
              {/*  <TextField
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                value={inputState.city}
                onChange={handleInputChange}
              />
              {inputsErrorsState &&
                inputState.city &&
                inputsErrorsState.city && (
                  <Alert severity="warning">
                    {inputsErrorsState.city.map((item) => (
                      <div key={"city-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="street"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
                required={true}
              />
              {/*  <TextField
                required
                fullWidth
                id="street"
                label="Street"
                name="street"
                autoComplete="street"
                value={inputState.street}
                onChange={handleInputChange}
              />
              {inputsErrorsState &&
                inputState.street &&
                inputsErrorsState.street && (
                  <Alert severity="warning">
                    {inputsErrorsState.street.map((item) => (
                      <div key={"street-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="houseNumber"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
                required={true}
              />
              {/*  <TextField
                required
                fullWidth
                id="houseNumber"
                label="House Number"
                name="houseNumber"
                autoComplete="house number"
                value={inputState.houseNumber}
                onChange={handleInputChange}
              />
              {inputsErrorsState &&
                inputState.houseNumber &&
                inputsErrorsState.houseNumber && (
                  <Alert severity="warning">
                    {inputsErrorsState.houseNumber.map((item) => (
                      <div key={"houseNumber-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="zipCode"
                inputStates={inputState}
                onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState}
                required={false}
              />
              {/*  <TextField
                required
                fullWidth
                id="zipCode"
                label="Zip Code"
                name="zipCode"
                autoComplete="zipCode"
                value={inputState.zipCode}
                onChange={handleInputChange}
              />
              {inputsErrorsState &&
                inputState.zipCode &&
                inputsErrorsState.zipCode && (
                  <Alert severity="warning">
                    {inputsErrorsState.zipCode.map((item) => (
                      <div key={"zipCode-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )} */}
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="buisness"
                    onChange={handleChangecheck}
                    color="primary"
                  />
                }
                label="SignUp as buisness"
              />
            </Grid>
          </Grid>
          <Stack xs={12} spacing={3} direction="row">
            <Button fullWidth variant="outlined" color="error">
              Cancle
            </Button>
            <Button fullWidth variant="outlined" color="success">
              <RestartAltIcon />
            </Button>
          </Stack>

          <Button
            type="submit"
            disabled={!buttonValid}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUpPage;
