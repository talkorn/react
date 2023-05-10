import { useState, useEffect, Fragment } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SingleCardPageComponent from "../components/singleCardPageComponent";
import ROUTES from "../routes/ROUTES";
import validateIdCardParamsSchema from "../validation/idValidation";
import { CircularProgress } from "@mui/material";
import atom from "../logo.svg";
import CssBaseline from "@mui/material/CssBaseline";
import UserComponent from "../components/UserComponent";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import validateProfileSchema from "../validation/ProfilePageValidation";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const UserPage = () => {
  const { id } = useParams();
  const [inputsErrorsState, setInputsErrorsState] = useState("");
  const [buttonValid, setButtonValid] = useState(false);
  const [inputState, setInputState] = useState("");
  const [initialnputState, setInitialnputState] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("users/userInfo");
        let newInputState = {
          ...data,
        };
        delete newInputState._id;
        delete newInputState.isAdmin;
        delete newInputState.isBiz;
        console.log("newInputState", newInputState);
        setInputState(newInputState);
        setInitialnputState(newInputState);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, []);
  useEffect(() => {
    const joiResponse = validateProfileSchema(inputState);
    setInputsErrorsState(joiResponse);
    console.log("joiResponse", joiResponse);
    if (
      inputState &&
      !joiResponse &&
      inputState.firstName &&
      inputState.lastName &&
      inputState.phone &&
      inputState.country &&
      inputState.email &&
      inputState.city &&
      inputState.street &&
      inputState.houseNumber
    ) {
      setButtonValid(true);
    } else {
      setButtonValid(false);
    }
  }, [inputState]);
  /*  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (inputsErrorsState) {
        return;
      }
      await axios.put("users/userInfo", inputState);
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err.response);
    }
  }; */
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    console.log(newInputState);
    setInputState(newInputState);
  };
  const resetButton = () => {
    setInputState(initialnputState);
  };
  const cancleButoon = () => {
    navigate(ROUTES.HOME);
  };
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
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Page
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image={inputState.imageUrl}
          title={inputState.title}
        />{" "}
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              { description: "firstName", required: true },
              { description: "middleName", required: false },
              { description: "lastName", required: true },
              { description: "phone", required: true },
              { description: "email", required: true },
              /*  { description: "web", required: true }, */
              { description: "imageUrl", required: false },
              { description: "imageAlt", required: false },
              { description: "state", required: false },
              { description: "country", required: true },
              { description: "city", required: true },
              { description: "street", required: true },
              { description: "houseNumber", required: true },
              { description: "zipCode", required: false },
            ].map((props, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <UserComponent
                  description={props.description}
                  inputStates={inputState}
                  onChanges={handleInputChange}
                  inputsErrorsStates={inputsErrorsState}
                  required={props.required}
                />
              </Grid>
            ))}
            {/*  <Stack xs={12} spacing={3} direction="row"> */}
            {/*  <Button
                onClick={cancleButoon}
                fullWidth
                variant="outlined"
                color="error"
              >
                Cancle
              </Button>
              <Button
                onClick={() => resetButton()}
                fullWidth
                variant="outlined"
                color="success"
              >
                <RestartAltIcon />
              </Button>
            </Stack>

            <Button
              /*    onClick={handleSubmit} */
            /*type="submit"
              disabled={!buttonValid}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button> */}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default UserPage;