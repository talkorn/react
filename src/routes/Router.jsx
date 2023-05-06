import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogIn";
import CardPage from "../pages/card";
import EditPage from "../pages/EditPage";
import FavoritePage from "../pages/Favorite";
import AddCardPage from "../pages/AddCard";
import MyCardsPage from "../pages/MyCards";
import LogOutOpage from "../pages/LogOut";

const Router = () => {
  return (
    <Container maxWidth="xl">
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path={ROUTES.LOGIN} element={<LogInPage />} />
        <Route path={ROUTES.LOGOUT} element={<HomePage />} />
        <Route path={ROUTES.ADDCARD} element={<AddCardPage />} />
        <Route path={ROUTES.MYCARDS} element={<MyCardsPage />} />
      </Routes>
    </Container>
  );
};
export default Router;
