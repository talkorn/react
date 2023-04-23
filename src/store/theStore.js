import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import favoritReducer from "./favorite";
const store = configureStore({
  reducer: {
    authSlice: authReducer,
    favoriteSlice: favoritReducer,
  },
});
export default store;
