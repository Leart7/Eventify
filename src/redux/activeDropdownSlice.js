import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDropdown: [],
};

const activeDropdownSlice = createSlice({
  name: "activeDropdown",
  initialState,
  reducers: {
    setActiveDropdown(state, action) {
      state.activeDropdown = [...state.activeDropdown, action.payload];
    },
    removeActiveDropdown(state) {
      state.activeDropdown = state.activeDropdown.slice(0, -1);
    },
    removeAllActiveDropdown(state) {
      state.activeDropdown = [];
    },
  },
});

export const {
  setActiveDropdown,
  removeActiveDropdown,
  removeAllActiveDropdown,
} = activeDropdownSlice.actions;

export default activeDropdownSlice.reducer;
