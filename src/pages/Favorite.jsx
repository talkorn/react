import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";
import useLoggedIn from "../hooks/useLoggedIn";
const FavoritePage = () => {
  const [cardsArr, setCardsArr] = useState(null);
  const [likesChanged, setLikesChanged] = useState(null);
  const LoggedIn = useLoggedIn();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((thestore) => thestore.authSlice);
  const payload = useSelector((store) => store.authSlice.payload);

  useEffect(() => {
    LoggedIn();

    axios
      .get("http://localhost:8181/api/cards/cards")
      .then(({ data }) => {
        console.log("data", data);
        setCardsArr(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
      });
  }, [likesChanged]);
  if (!payload) {
    return;
  }
  const idUser = payload._id;
  console.log("payload ", payload);
  console.log("idUser  ", idUser);
  console.log("isLoggedIn", isLoggedIn);

  if (!idUser) {
    return;
  }
  if (!cardsArr) {
    return <CircularProgress />;
  }
  const moveToCardPage = (id) => {
    console.log("id", id);
    navigate(`/card/${id}`);
  };
  const moveToEditPage = (id) => {
    console.log("id", id);
    navigate(`/edit/${id}`);
  };
  /*  const addToFavorite = (id) => {
    axios.patch("/cards/card-like/" + id);
    axios.get("http://localhost:8181/api/cards/cards").then(({ data }) => {
      console.log("data", data);
      setCardsArr(data);
    });
 
    console.log("here");
  }; */
  const addToFavorite = async (id) => {
    await axios.patch(`/cards/card-like/${id}`);

    try {
      const { data } = await axios.get("http://localhost:8181/api/cards/cards");
      setCardsArr(data);
    } catch (err) {
      console.log("Error fetching updated card list", err);
    }
  };
  const deleteCardFromInitialCardsArr = async (id) => {
    try {
      console.log("id", id);
      setCardsArr((cardsArr) => cardsArr.filter((item) => item.likes == id));
      console.log("cardsArr", cardsArr);
      await axios.delete("cards/" + id);
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };

  return (
    <Box>
      <h1>Favorite</h1>
      {/*   {!cardsArr && <h2>you dont have any favorite cards</h2>}

      {cardsArr && <h2>Here You Can See All Your Favorite Cards</h2>}
 */}
      {/*  {(!cardsArr || cardsArr.length === 0) && (
        <h2>you don't have any favorite cards</h2>
      )} */}
      <Grid container spacing={2}>
        {cardsArr &&
          cardsArr
            .filter((item) => item.likes == idUser && idUser)
            .map((item) => (
              <Grid item xs={4} key={item._id + Date.now()}>
                <CardComponent
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
                  onFavorite={addToFavorite}
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
export default FavoritePage;