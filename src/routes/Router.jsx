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
import SandBoxPage from "../pages/SandBoxPage";
import NestedPage1 from "../pages/NestesPage1";
import NestedPage2 from "../pages/NestedPage2";
import NestedPage3 from "../pages/NestedPage3";
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
        <Route path={"/sandbox"} element={<SandBoxPage />}>
          <Route path="nestedpage1" element={<NestedPage1 />} />
          <Route path="nestedpage2" element={<NestedPage2 />} />
          <Route path="nestedpage3" element={<NestedPage3 />} />
        </Route>
      </Routes>
    </Container>
  );
};
export default Router;
