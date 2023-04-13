import { Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
    </Routes>
  );
};
export default Router;
