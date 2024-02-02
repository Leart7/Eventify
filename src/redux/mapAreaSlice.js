import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: [],
};

const mapAreaSlice = createSlice({
  name: "mapArea",
  initialState,
  reducers: {
    setAreaLocation(state, action) {
      state.location = action.payload;
    },
  },
});

export const { setAreaLocation } = mapAreaSlice.actions;

export default mapAreaSlice.reducer;
