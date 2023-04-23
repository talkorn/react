import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponents";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { useSelector } from "react-redux";
import useLoggedIn from "../hooks/useLoggedIn";
import { favoriteActions } from "../store/favorite";
import { useDispatch } from "react-redux";
import favoriteSlice from "../store/favorite";

const HomePage = () => {
  const favoriteArr = useSelector((state) => state.favoriteSlice.counter);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  const LoggedIn = useLoggedIn();
  const dispatch = useDispatch();
  const payload = useSelector((store) => store.authSlice.payload);
  useEffect(() => {}, [favoriteArr]);

  useEffect(() => {
    /*  dispatch(); */
    LoggedIn();

    axios
      .get("http://localhost:8181/api/cards/cards")
      .then(({ data }) => {
        console.log("data", data);
        setCardsArr(data);
        /*  if (data) {
          for (data.likes of data) {
            if (data.likes == idUser) {
              dispatch(favoriteActions.addToFavorite());
            }
          }
        } */
        /*  const newFavoriteArr = data.filter((item) => item.likes == idUser); */
        console.log("favoriteArr", favoriteArr);
      })
      .catch((err) => {
        console.log("err from axios", err);
      });
  }, [favoriteArr]);
  if (!payload) {
    return;
  }
  const idUser = payload._id;

  if (!cardsArr) {
    return <CircularProgress />;
  }
  const apdateFaforiteArrInitial = () => {
    if (favoriteArr === 0) {
      console.log("cardsArr.likes", cardsArr);
      console.log("idUser", idUser);

      for (cardsArr.likes of cardsArr) {
        console.log("cardsArr.likes", cardsArr.likes.likes);
        if (cardsArr.likes.likes == idUser) {
          console.log("idUser", idUser);
          dispatch(favoriteActions.addToFavorite());
        }
      }
    }
  };

  const moveToCardPage = (id) => {
    console.log("id", id);
    navigate(`/card/${id}`);
  };
  const moveToEditPage = (id) => {
    console.log("id", id);
    navigate(`/edit/${id}`);
  };
  /* const addToFavorite = (id) => {
    axios.patch("/cards/card-like/" + id);
    console.log("here");
  };
   */
  const addToFavorite = async (id) => {
    apdateFaforiteArrInitial();
    await axios.patch(`/cards/card-like/${id}`);
    const arrr = cardsArr.filter((item) => item.likes == idUser && idUser);
    try {
      const { data } = await axios.get("http://localhost:8181/api/cards/cards");
      setCardsArr(data);
      const newFavoriteArr = data.filter((item) => item.likes == idUser);
      if (newFavoriteArr > arrr) {
        dispatch(favoriteActions.addToFavorite());
        localStorage.setItem("favorite", JSON.stringify(newFavoriteArr));
        console.log("favoriteArr", favoriteArr);
      } else {
        dispatch(favoriteActions.removeFromFavorite());
        localStorage.removeItem("favorite");
      }
    } catch (err) {
      console.log("Error fetching updated card list", err);
      console.log("favoriteArr", favoriteArr);
    }
  };

  /*  const handleAddToFavorite = (card) => {
    dispatch(favoriteActions.addToFavorite(card));
  };
  const handleRemoveFromFavorite = (card) => {
    dispatch(favoriteActions.removeFromFavorite(card));
  }; */
  const deleteCardFromInitialCardsArr = async (id) => {
    try {
      console.log("id", id);
      setCardsArr((cardsArr) => cardsArr.filter((item) => item._id != id));
      console.log("cardsArr", cardsArr);
      await axios.delete("cards/" + id);
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };
  return (
    <Box>
      <h1>Cards Page</h1>
      <h2>Here You Can Find All Our Buisness Cards</h2>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
            {" "}
            <CardComponent
              /*  onFavorite={
                favoriteArr.includes(item)
                  ? handleRemoveFromFavorite.bind(item)
                  : handleAddToFavorite.bind(item)
              } */
              likes={item.likes}
              idUser={idUser}
              onClick={moveToCardPage}
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              description={item.description}
              phone={item.phone}
              img={item.image.url}
              web={item.web}
              state={item.state}
              country={item.country}
              city={item.city}
              street={item.street}
              email={item.email}
              houseNumber={item.houseNumber}
              zipCode={item.zipCode}
              bizNumber={item.bizNumber}
              onEdit={moveToEditPage}
              onDelete={deleteCardFromInitialCardsArr}
              onFavorites={addToFavorite}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};
export default HomePage;
