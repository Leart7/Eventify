import {
  faArrowRight,
  faLocationDot,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchCities from "../../ui/SearchCities";
import CitiesList from "../../ui/CitiesList";
import { useCities } from "../../hooks/useCities";
import { useNavigate } from "react-router";
import { addFilter } from "../../redux/filtersSlice";
import { useSearchParams } from "react-router-dom";

function SearchLocationModal({
  setLocationFocused,
  searchQuery,
  setSearchQuery,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const { activeLocationFilter } = useSelector(
    (store) => store.activeLocationFilter,
  );

  const { filters } = useSelector((store) => store.filters);
  const onlineFilter = filters.find((f) => f.filterName === "Online").option;

  const { userCity } = useSelector((store) => store.userCity);

  const [searchUnderline, setSearchUnderline] = useState(false);
  const [locationUnderline, setLocationUnderline] = useState(false);

  const [locationQuery, setLocationQuery] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  const [queryCities, setQueryCities] = useState([]);

  const { cities, isLoading, error } = useCities();

  const placeHolderCondition = searchClicked
    ? "Choose a location"
    : activeLocationFilter === "currentLocation"
    ? "Your Location"
    : activeLocationFilter === "area"
    ? "map area"
    : onlineFilter
    ? "Online"
    : activeLocationFilter.length !== 0
    ? `${activeLocationFilter}`
    : userCity.length !== 0
    ? userCity
    : "Choose a location";

  const classNameCondition = searchClicked
    ? "placeholder-gray-400"
    : activeLocationFilter.length !== 0 || userCity.length !== 0
    ? "placeholder-black"
    : "placeholder-gray-400";

  function submit() {
    navigate("/filter-events");

    let recentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];

    if (
      searchQuery.trim().length !== 0 &&
      !recentSearches.includes(searchQuery)
    ) {
      recentSearches.push(searchQuery);

      const maxLength = 3;
      if (recentSearches.length > maxLength) {
        recentSearches = recentSearches.slice(
          recentSearches.length - maxLength,
        );
      }

      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
    dispatch(addFilter("Search", searchQuery));
  }

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
      }
    },
    [cities.results, locationQuery],
  );

  return (
    <div className="mt-12 flex w-full flex-col gap-y-5  text-2xl lg:text-3xl">
      <div className="relative flex w-full ">
        <FontAwesomeIcon icon={faSearch} className="absolute inset-0 top-2" />
        <input
          onFocus={() => setSearchUnderline(true)}
          onBlur={() => setSearchUnderline(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit();
            }
            if (e.key === "Escape") {
              e.target.blur();
              e.stopPropagation();
            }
          }}
          placeholder="Search for anything"
          className={`${
            searchUnderline
              ? "transition-fade-in2 border-blue-700"
              : "transition-fade-out2 border-gray-200"
          } unselectable ms-10 border-b-4 pb-2 font-bold placeholder-gray-400 outline-none `}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <div
          title="Run Search"
          role="button"
          onClick={submit}
          className={`${
            searchQuery.length !== 0 && "border-2 border-blue-700 text-blue-700"
          } flex h-[39px] w-[39px] items-center justify-center rounded-full  text-center hover:cursor-pointer hover:bg-gray-100  lg:h-[50px]
           lg:w-[50px] lg:text-4xl `}
        >
          <FontAwesomeIcon role="button" icon={faArrowRight} className="p-3" />
        </div>
      </div>

      <div className="flex  items-center justify-between ">
        <div className="relative">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="absolute inset-0 top-2"
          />
          <input
            id="locationInput"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.target.blur();
                e.stopPropagation();
              }
            }}
            onFocus={() => {
              setSearchClicked(true);
              setLocationUnderline(true);
              setLocationFocused(true);
            }}
            onBlur={() => {
              setLocationUnderline(false);
              setSearchClicked(false);
              setLocationQuery("");
              setLocationFocused(false);
            }}
            onChange={(e) => {
              setLocationQuery(e.target.value);
              e.target.value.length === 0 && setSearchClicked(true);
            }}
            placeholder={placeHolderCondition}
            className={`${classNameCondition} ${
              locationUnderline
                ? "transition-fade-in2 border-blue-700"
                : "transition-fade-out2 border-gray-200"
            } unselectable ms-10  border-b-4 pb-2 font-bold  outline-none`}
            value={locationQuery}
          />
          {searchClicked && locationQuery.length === 0 && (
            <SearchCities setSearchClicked={setSearchClicked} from="modal" />
          )}
          {locationQuery.length !== 0 && queryCities.length !== 0 && (
            <CitiesList from="modal" queryCities={queryCities} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchLocationModal;
