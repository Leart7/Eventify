import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userCity: "",
};

const userCitySlice = createSlice({
  name: "userCity",
  initialState,
  reducers: {
    setUserCity(state, action) {
      state.userCity = action.payload;
    },
  },
});

export const { setUserCity } = userCitySlice.actions;

export default userCitySlice.reducer;
