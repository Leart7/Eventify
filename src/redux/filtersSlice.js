import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [
    {
      filterName: "Date",
      option: "",
    },
    {
      filterName: "Category",
      option: "",
    },
    {
      filterName: "Format",
      option: "",
    },
    {
      filterName: "Price",
      option: "",
    },
    {
      filterName: "Language",
      option: "",
    },
    {
      filterName: "Currency",
      option: "",
    },
    {
      filterName: "Online",
      option: "",
    },
    {
      filterName: "Search",
      option: "",
    },
  ],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter: {
      prepare(filterName, option) {
        return {
          payload: {
            filterName,
            option,
          },
        };
      },
      reducer(state, action) {
        const filter = state.filters.find(
          (filter) => filter.filterName === action.payload.filterName,
        );
        filter.option = action.payload.option;
      },
    },
    deleteFilter(state, action) {
      const filter = state.filters.find(
        (filter) => filter.option === action.payload,
      );
      filter.option = "";
    },
    clearFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const { addFilter, deleteFilter, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
