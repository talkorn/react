import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite(state) {
      state.counter = state.counter + 1;
    },
    removeFromFavorite(state) {
      state.counter = state.counter = state.counter - 1;
    },
    addNumber(state, action) {
      console.log(action.payload);
      //state.counter = state.counter + +action.payload
      state.counter += +action.payload;
    },
  },
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice.reducer;
