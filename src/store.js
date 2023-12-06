import { configureStore } from "@reduxjs/toolkit";
import activeDropdownSlice from "./redux/activeDropdownSlice";
import filtersSlice from "./redux/filtersSlice";
import userLocationSlice from "./redux/userLocationSlice";
import activeLocationFilterSlice from "./redux/activeLocationFilterSlice";
import mapAreaSlice from "./redux/mapAreaSlice";
import searchClickedSlice from "./redux/searchClickedSlice";
import userCitySlice from "./redux/userCitySlice";

const store = configureStore({
  reducer: {
    activeDropdown: activeDropdownSlice,
    filters: filtersSlice,
    userLocation: userLocationSlice,
    activeLocationFilter: activeLocationFilterSlice,
    mapArea: mapAreaSlice,
    userCity: userCitySlice,
    searchClicked: searchClickedSlice,
  },
});

export default store;
