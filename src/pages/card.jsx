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
import { useSelector } from "react-redux";
import useLoggedIn from "../hooks/useLoggedIn";
import { favoriteActions } from "../store/favorite";
import { useDispatch } from "react-redux";

const CardPage = () => {
  const favoriteArr = useSelector((state) => state.favoriteSlice.counter);
  const payload = useSelector((store) => store.authSlice.payload);
  const LoggedIn = useLoggedIn();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputState, setInputState] = useState(null);

  useEffect(() => {
    LoggedIn();
    console.log(" favoriteArr", favoriteArr);
    if (inputState) {
      if (inputState.likes == idUser) {
        console.log(" favoriteArr", favoriteArr);
        dispatch(favoriteActions.addToFavorite());
      }
    }
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
    if (inputState) {
      if (inputState.likes == idUser) {
        console.log(" favoriteArr", favoriteArr);
        dispatch(favoriteActions.addToFavorite());
      }
    }
  }, [id]);
  if (!payload) {
    return;
  }
  const idUser = payload._id;
  const moveToEditPage = (id) => {
    console.log("id", id);
    navigate(`/edit/${id}`);
  };
  const addToFavorite = async (id) => {
    await axios.patch(`/cards/card-like/${id}`);
    let arrr = "";
    if (inputState.likes == idUser) {
      arrr = { ...inputState };
    }

    try {
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

      setInputState(newInputState);

      let newFavoriteArr = "";
      if (data.likes == idUser) {
        dispatch(favoriteActions.addToFavorite());
        console.log("favoriteArr", favoriteArr);
        /* newFavoriteArr = { ...data }; */
      } else {
        dispatch(favoriteActions.removeFromFavorite());
        console.log("favoriteArr", favoriteArr);
      }
      /*   const newFavoriteArr = data.filter((item) => item.likes == idUser); */
      /*  if (newFavoriteArr > arrr) {
       
        console.log("favoriteArr", favoriteArr);
      } else {
       ;
      } */
    } catch (err) {
      console.log("Error fetching updated card list", err);
    }
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
          onFavorites={addToFavorite}
          likes={inputState.likes}
          idUser={idUser}
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
