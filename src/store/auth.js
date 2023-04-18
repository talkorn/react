import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  payload: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      console.log("state", state);
      if (!action.payload) {
        return;
      }
      state.isLoggedIn = true;
      state.payload = action.payload;
      console.log("state.payload", state.payload);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.payload = null;
    },
  },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
