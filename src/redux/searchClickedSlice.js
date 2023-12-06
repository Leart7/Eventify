import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchClicked: false,
};

const searchClickedSlice = createSlice({
  name: "searchClicked",
  initialState,
  reducers: {
    setSearchModalClicked(state, action) {
      state.searchClicked = action.payload;
    },
  },
});

export const { setSearchModalClicked } = searchClickedSlice.actions;

export default searchClickedSlice.reducer;
