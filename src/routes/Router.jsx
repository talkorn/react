import { Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogIn";
import CardPage from "../pages/card";
import EditPage from "../pages/EditPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
      <Route path="/card/:id" element={<CardPage />} />
      <Route path="/edit/:id" element={<EditPage />} />
      <Route path={ROUTES.LOGIN} element={<LogInPage />} />
    </Routes>
  );
};
export default Router;
