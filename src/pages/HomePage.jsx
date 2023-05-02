import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponents";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { useSelector } from "react-redux";
import useLoggedIn from "../hooks/useLoggedIn";
import CssBaseline from "@mui/material/CssBaseline";
const HomePage = () => {
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  const LoggedIn = useLoggedIn();
  const payload = useSelector((store) => store.authSlice.payload);

  useEffect(() => {
    /*  dispatch(); */
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
  }, []);
  if (!payload) {
    return;
  }
  const idUser = payload._id;

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

  const addToFavorite = async (id) => {
    await axios.patch(`/cards/card-like/${id}`);
    try {
      const { data } = await axios.get("http://localhost:8181/api/cards/cards");
      setCardsArr(data);
      //toast?
    } catch (err) {
      console.log("Error fetching updated card list", err);
    }
  };

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
      <CssBaseline />
      <h1>Cards Page</h1>
      <h2>Here You Can Find All Our Buisness Cards</h2>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id + Date.now()}>
            {" "}
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
