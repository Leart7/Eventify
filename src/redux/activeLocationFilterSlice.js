import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeLocationFilter: "",
};

const activeLocationFilterSlice = createSlice({
  name: "activeLocationFilter",
  initialState,
  reducers: {
    setActiveLocationFilter(state, action) {
      state.activeLocationFilter = action.payload;
    },
  },
});

export const { setActiveLocationFilter } = activeLocationFilterSlice.actions;

export default activeLocationFilterSlice.reducer;
