import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: [],
};

const searchModalCitySlice = createSlice({
  name: "searchModalCity",
  initialState,
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
  },
});

export const { setCity } = searchModalCitySlice.actions;

export default searchModalCitySlice.reducer;
