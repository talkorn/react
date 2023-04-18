import { useState, useEffect, Fragment } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SingleCardPageComponent from "../components/singleCardPageComponent";
import ROUTES from "../routes/ROUTES";
import validateIdCardParamsSchema from "../validation/idValidation";
import { CircularProgress } from "@mui/material";
import atom from "../logo.svg";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import UserComponent from "../components/UserComponent";
import Stack from "@mui/material/Stack";

const CardPage = () => {
  const { id } = useParams();
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [inputState, setInputState] = useState({
    id: "",
    title: "",
    subTitle: "",
    description: "",
    phone: "",
    img: "",
    web: "",
    state: "",
    country: "",
    city: "",
    street: "",
    email: "",
    houseNumber: "",
    zipCode: "",
    bizNumber: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        if (!id) {
          return;
        }
        const errors = validateIdCardParamsSchema({ id });
        if (errors) {
          // there was errors = incorrect id
          navigate("/");
          return;
        }
        const { data } = await axios.get("/cards/card/" + id);
        let newInputState = {
          ...data,
        };
        if (!data) {
          return;
        }
        if (data.image && data.image.url) {
          newInputState.url = data.image.url;
        } else {
          newInputState.url = "";
        }
        if (data.image && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        if (data.bizNumber && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        /*  delete newInputState.bizNumber;
        delete newInputState.createdAt;  */
        console.log("newInputState", newInputState);
        setInputState(newInputState);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, [id]);
  useEffect(() => {
    /*  const joiResponse = editValidationSchema(inputState);
    setInputsErrorsState(joiResponse);
    console.log("inputsErrorsState", inputsErrorsState); */
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
      /* setButtonValid(true); */
    }
  }, [inputState]);
  if (!inputState) {
    return <CircularProgress />;
  }
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
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Page
        </Typography>
        <Box
          component="form"
          noValidate
          /* onSubmit={handleSubmit} */ sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="title"
                inputStates={inputState}
                /*  onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState} */
                required={true}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <UserComponent
                description="subtitle"
                inputStates={inputState}
                /*  onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState} */
                required={true}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <UserComponent
                description="description"
                inputStates={inputState}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="phone"
                inputStates={inputState}
                /* onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState} */
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="email"
                inputStates={inputState}
                /* onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState} */
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="web"
                inputStates={inputState}
                /*  onChanges={handleInputChange} */
                /*  inputsErrorsStates={inputsErrorsState} */
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="imageUrl"
                inputStates={inputState}
                /*  onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState} */
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="imageAlt"
                inputStates={inputState}
                /* onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState} */
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="state"
                inputStates={inputState}
                /*  onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState} */
                required={false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="country"
                inputStates={inputState}
                /* onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState} */
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="city"
                inputStates={inputState}
                /* onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState} */
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="street"
                inputStates={inputState}
                /* onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState} */
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="houseNumber"
                inputStates={inputState}
                /* onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState} */
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserComponent
                description="zipCode"
                inputStates={inputState}
                /*  onChanges={handleInputChange}
                inputsErrorsStates={inputsErrorsState} */
                required={false}
              />
            </Grid>

            {/*  <Grid item xs={12}>
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
          </Grid> */}
            <Stack xs={12} spacing={3} direction="row">
              <Button
                /*  onClick={cancleButoon} */
                fullWidth
                variant="outlined"
                color="error"
              >
                Cancle
              </Button>
              <Button
                /*   onClick={resetButton} */
                fullWidth
                variant="outlined"
                color="success"
              >
                {/*   <RestartAltIcon /> */}
              </Button>
            </Stack>

            <Button
              type="submit"
              /*  disabled={!buttonValid} */
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default CardPage;
{
  /* <SingleCardPageComponent
          id={inputState._id}
          title={inputState.title}
          subTitle={inputState.subTitle}
          description={inputState.description}
          phone={inputState.phone}
          img={inputState.url}
          web={inputState.web}
          state={inputState.state}
          country={inputState.country}
          city={inputState.city}
          street={inputState.street}
          email={inputState.email}
          houseNumber={inputState.houseNumber}
          zipCode={inputState.zipCode}
          bizNumber={inputState.bizNumber}
        /> */
}
