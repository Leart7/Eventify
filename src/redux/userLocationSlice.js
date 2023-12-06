import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLocation: [],
};

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {
    setUserLocation(state, action) {
      state.userLocation = action.payload;
    },
  },
});

export const { setUserLocation } = userLocationSlice.actions;

export default userLocationSlice.reducer;
