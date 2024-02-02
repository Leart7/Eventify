import {
  faClapperboard,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addFilter, deleteFilter } from "../redux/filtersSlice";
import { useGeolocation } from "../hooks/useGeolocation";
import { useEffect } from "react";
import { setActiveLocationFilter } from "../redux/activeLocationFilterSlice";
import { setAreaLocation } from "../redux/mapAreaSlice";

function SearchCities({ setSearchClicked, from }) {
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { activeLocationFilter } = useSelector(
    (store) => store.activeLocationFilter,
  );

  const onlineFilter = useSelector(
    (store) =>
      store.filters.filters.find((f) => f.filterName === "Online").option,
  );

  useEffect(
    function () {
      if (geolocationPosition)
        dispatch(
          setAreaLocation([geolocationPosition.lat, geolocationPosition.lng]),
        );
    },
    [geolocationPosition, dispatch],
  );

  function close() {
    setTimeout(() => {
      setSearchClicked(false);
    }, 1);
  }

  const blurInput = () => {
    const inputElement = document.getElementById("locationInput");

    if (inputElement) {
      setTimeout(() => {
        inputElement.blur();
      }, 1);
    }
  };

  return (
    <>
      <div className={`absolute inset-0 top-10 z-50 w-96`}>
        <ul className=" flex flex-col rounded-md border bg-white py-2 text-sm font-normal shadow-md">
          {activeLocationFilter !== "currentLocation" && (
            <li
              role="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                getPosition();
                dispatch(setActiveLocationFilter("area"));
                searchParams.delete("Online");
                searchParams.delete("city");
                if (from !== "modal") {
                  setSearchParams(searchParams);
                }
                if (onlineFilter.length !== 0) {
                  dispatch(deleteFilter("Online"));
                }
                close();
                blurInput();
              }}
              className={`${
                searchParams.get("Online") !== null ? "" : "border-b"
              } flex w-full items-center gap-x-4 px-7 py-4 hover:cursor-pointer hover:bg-stone-100`}
            >
              <FontAwesomeIcon
                icon={faLocationCrosshairs}
                className="text-lg text-blue-700"
              />{" "}
              Use my current location
            </li>
          )}
          {searchParams.get("Online") === null && (
            <li
              role="button"
              onMouseDown={() => {
                dispatch(addFilter("Online", "Online"));
                if (from !== "modal") {
                  searchParams.set("Online", "Online");
                  searchParams.delete("box");
                  searchParams.delete("zoom");
                  setSearchParams(searchParams);
                }
                dispatch(setActiveLocationFilter(""));
              }}
              className="flex w-full items-center gap-x-4 px-7 py-4 hover:cursor-pointer hover:bg-stone-100"
            >
              <FontAwesomeIcon
                icon={faClapperboard}
                className="text-lg text-blue-700"
              />{" "}
              Browse online events
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default SearchCities;
