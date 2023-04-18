import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";

const useLoggedIn = () => {
  const dispatch = useDispatch();
  return () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const playload = jwt_decode(token);
    console.log("playload", playload);
    dispatch(authActions.login(playload));
  };
};
export default useLoggedIn;
