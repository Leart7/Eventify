import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastId: null,
};

const activeToasterSlice = createSlice({
  name: "activeToaster",
  initialState,
  reducers: {
    setActiveToasterId(state, action) {
      state.toastId = action.payload;
    },
  },
});

export const { setActiveToasterId } = activeToasterSlice.actions;

export default activeToasterSlice.reducer;
