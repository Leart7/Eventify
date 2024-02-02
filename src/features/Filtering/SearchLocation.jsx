import {
  faArrowRight,
  faLocationCrosshairs,
  faLocationDot,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useCities } from "../../hooks/useCities";
import SearchCities from "../../ui/SearchCities";
import CitiesList from "../../ui/CitiesList";
import { useDispatch, useSelector } from "react-redux";
import { useGeolocation } from "../../hooks/useGeolocation";
import { setUserLocation } from "../../redux/userLocationSlice";
import { useSearchParams } from "react-router-dom";

function SearchLocation({ showSearchInput = true }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { activeLocationFilter } = useSelector(
    (store) => store.activeLocationFilter,
  );

  const { location: mapAreaLocation } = useSelector((store) => store.mapArea);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const testSearch = searchParams.get("Search");
    if (testSearch !== null && testSearch !== undefined) {
      setSearchQuery(testSearch);
    }
  }, [searchParams]);

  const [locationQuery, setLocationQuery] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  const [queryCities, setQueryCities] = useState([]);

  const { cities, isLoading, error } = useCities();

  const placeHolderCondition = searchClicked
    ? "Choose a location"
    : activeLocationFilter === "currentLocation"
    ? "Your Location"
    : searchParams.get("city") !== null
    ? `${searchParams.get("city").split("&")[2]}`
    : searchParams.get("box") !== null
    ? "map area"
    : "Choose a location";

  const classNameCondition = searchClicked
    ? "placeholder-gray-400"
    : activeLocationFilter.length !== 0 || searchParams.get("box") !== null
    ? "placeholder-black"
    : "placeholder-gray-400";

  useEffect(
    function () {
      if (locationQuery.length !== 0) {
        setQueryCities(
          cities.results
            ?.map((c) => ({
              name: c.name,
              location: c.location,
            }))
            .filter((c) =>
              c.name.toLowerCase().startsWith(locationQuery.toLowerCase()),
            ),
        );
        setSearchClicked(false);
      }
    },
    [cities.results, locationQuery],
  );

  useEffect(
    function () {
      if (geolocationPosition)
        dispatch(
          setUserLocation([geolocationPosition?.lat, geolocationPosition?.lng]),
        );
    },
    [geolocationPosition, dispatch],
  );

  // useEffect(
  //   function () {
  //     if (searchParams.get("box") !== null && activeLocationFilter !== "area") {
  //       searchParams.set(
  //         "city",
  //         `${mapAreaLocation[0]}&${mapAreaLocation[1]}&ferizaj`,
  //       );
  //       setSearchParams(searchParams);
  //     }
  //   },
  //   [activeLocationFilter, searchParams, setSearchParams],
  // );

  return (
    <div
      className={`flex items-center justify-between border-b-2 pb-3 ${
        showSearchInput ? "mb-7" : ""
      }`}
    >
      <div className="flex w-full flex-col gap-y-5 pe-10">
        {showSearchInput && (
          <div className="flex items-center justify-between ">
            <div className="relative w-full">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute inset-0 top-1"
              />
              <input
                placeholder="Search anything"
                className="unselectable w-full border-none  ps-7 text-lg font-semibold placeholder-gray-400 outline-none"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </div>
            {searchQuery.length !== 0 && (
              <div
                role="button"
                onClick={() => {
                  setSearchQuery("");
                  searchParams.delete("Search");
                  setSearchParams(searchParams);
                }}
                className="flex h-[39px] w-[39px] items-center justify-center rounded-full text-center hover:cursor-pointer hover:bg-stone-100"
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between ">
          <div className="relative w-full">
            {showSearchInput && (
              <FontAwesomeIcon
                icon={faLocationDot}
                className="absolute inset-0 top-1"
              />
            )}

            <input
              id="locationInput"
              onFocus={() => setSearchClicked(true)}
              onBlur={() => {
                setSearchClicked(false);
                setLocationQuery("");
              }}
              onKeyDown={(e) => {
                e.key === "Escape" && e.target.blur();
                e.key !== "Escape" && setSearchClicked(false);
              }}
              onChange={(e) => {
                setLocationQuery(e.target.value);
                e.target.value.length === 0 && setSearchClicked(true);
              }}
              placeholder={placeHolderCondition}
              className={`${classNameCondition} unselectable w-full border-none ps-7 text-lg font-medium  outline-none`}
              value={locationQuery}
            />
            {searchClicked && (
              <SearchCities setSearchClicked={setSearchClicked} />
            )}
            {locationQuery.length !== 0 && queryCities.length !== 0 && (
              <CitiesList queryCities={queryCities} />
            )}
          </div>
          <div
            role="button"
            onClick={() => getPosition()}
            className="flex h-[39px] w-[39px] items-center justify-center rounded-full text-center hover:cursor-pointer hover:bg-stone-100 xl:hidden"
          >
            <FontAwesomeIcon icon={faLocationCrosshairs} />
          </div>
        </div>
      </div>
      {showSearchInput && (
        <>
          <div
            role="button"
            className="flex h-[39px] w-[39px] items-center justify-center rounded-full border-2  text-center hover:cursor-pointer hover:bg-stone-50 sm:hidden"
            title="Run Search"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
          <button
            onClick={() => {
              searchParams.set("Search", searchQuery);
              setSearchParams(searchParams);
            }}
            title="Run Search"
            className="hover:bg-stone-5 hidden rounded-md border-2 border-gray-400 px-7 py-2 text-sm font-medium transition-all duration-150 hover:border-gray-500 hover:bg-gray-100  sm:block"
          >
            Search
          </button>
        </>
      )}
    </div>
  );
}

export default SearchLocation;
