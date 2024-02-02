import { configureStore } from "@reduxjs/toolkit";
import activeDropdownSlice from "./redux/activeDropdownSlice";
import filtersSlice from "./redux/filtersSlice";
import userLocationSlice from "./redux/userLocationSlice";
import activeLocationFilterSlice from "./redux/activeLocationFilterSlice";
import mapAreaSlice from "./redux/mapAreaSlice";
import userCitySlice from "./redux/userCitySlice";
import searchModalCitySlice from "./redux/searchModalCitySlice";
import activeToasterSlice from "./redux/activeToasterSlice";
import createEventSlice from "./redux/createEventSlice";
import agendaSlice from "./redux/agendaSlice";

const store = configureStore({
  reducer: {
    activeDropdown: activeDropdownSlice,
    filters: filtersSlice,
    userLocation: userLocationSlice,
    activeLocationFilter: activeLocationFilterSlice,
    mapArea: mapAreaSlice,
    userCity: userCitySlice,
    searchModalCity: searchModalCitySlice,
    activeToaster: activeToasterSlice,
    createEvent: createEventSlice,
    createAgenda: agendaSlice,
  },
});

export default store;
