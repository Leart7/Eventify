import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createEventData: {
    EventTitle: "",
    Organizer: "",
    EventStart: "",
    EventEnd: "",
    Country: "",
    Category: "",
    Language: "",
    Description: "",
    About: "",

    Latitude: "",
    Longitude: "",
    Description: "",
    About: "",
    PhotoPhoto: "",
    Tags: [],
    
    
    
    // Latitude: "",
    // Longitude: ""
  },
  // other initial state properties...
};

const formDataSlice = createSlice({
  name: "createEventData",
  initialState,
  reducers: {
    saveEventData(state, action) {
      state.createEventData = { ...state.createEventData, ...action.payload };
    },
    saveEventDetails(state, action) {
      state.createEventData = { ...state.createEventData, ...action.payload };
    },
    // Add other reducer functions as needed...
  },
});

export const { saveEventData, saveEventDetails } = formDataSlice.actions;






export default formDataSlice.reducer;
