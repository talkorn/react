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

const CardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputState, setInputState] = useState(null);

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
        /*   delete newInputState._id; */
        /*   delete newInputState.user_id; */
        /*  delete newInputState.bizNumber;*/
        /*   delete newInputState.createdAt; */
        console.log("newInputState", newInputState);
        setInputState(newInputState);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, [id]);
  const moveToEditPage = (id) => {
    console.log("id", id);
    navigate(`/edit/${id}`);
  };
  const deleteCardFromInitialCardsArr = async () => {
    try {
      await axios.delete("cards/" + id);
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };

  if (!inputState) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Grid sx={{ textAlign: "center" }}>
        <h1>Card Page</h1>
        <h2> {inputState.title}</h2>
      </Grid>
      <Grid container spacing={2}>
        <SingleCardPageComponent
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
          createdAt={inputState.createdAt}
          onEdit={moveToEditPage}
          onDelete={deleteCardFromInitialCardsArr}
        />
      </Grid>
    </Box>
  );
};
export default CardPage;
