import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  agendaSlice: [],
  // other initial state properties...
};

const agendaSlice = createSlice({
  name: "agendaSlice",
  initialState,
  reducers: {
    saveAgendaSlice(state, action) {
      state.agendaSlice = action.payload;
    },
    // Add other reducer functions as needed...
  },
});

export const { saveAgendaSlice  } = agendaSlice.actions;

export default agendaSlice.reducer;
