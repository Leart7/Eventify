import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import FiltersMobileModal from "./FiltersMobileModal";
import FilterPill from "../../ui/FilterPill";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, clearFilters } from "../../redux/filtersSlice";
import { useUrlFilters } from "../../hooks/useUrlFilters";
import { useSearchParams } from "react-router-dom";
import FiltersSidebar from "./FiltersSidebar";
import ActiveFilters from "../../ui/ActiveFilters";
import useRemoveFiltersUrl from "../../hooks/useRemoveFiltersUrl";

const locations = [
  {
    city: "Tetovo",
    location: [42, 21],
  },
  {
    city: "Peceh",
    location: [41, 21],
  },
];

function Filters({ setState }) {
  const dispatch = useDispatch();
  const [areOpenFilters, setAreOpenFilters] = useState([false, ""]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(function () {
    if (areOpenFilters[0]) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  const { urlObj } = useUrlFilters();
  const { removeAllFiltersUrl } = useRemoveFiltersUrl();

  const activeFiltersUrl = urlObj.filter((f) => f.option);

  const filtersSlice = useSelector((store) => store.filters.filters);

  const activeFilters = filtersSlice
    .map((f) => f.option)
    .filter((f) => f.length !== 0);

  const activeFiltersAll = filtersSlice.filter((f) => f.option.length !== 0);

  const filtersOrder = filtersSlice.slice().sort((a, b) => {
    if (a.option !== "" && b.option === "") {
      return -1;
    } else if (a.option === "" && b.option !== "") {
      return 1;
    }

    if (a.option !== "" && b.option !== "") {
      return 0;
    }

    return 0;
  });

  useEffect(function () {
    if (activeFiltersUrl.length !== 0) {
      for (let i = 0; i < activeFiltersUrl?.length; i++) {
        dispatch(
          addFilter(
            activeFiltersUrl[i].filterName,
            activeFiltersUrl[i].option
              .replaceAll("-", " ")
              .replaceAll("and", "&")
              .replace("Auto Boat & Air", "Auto, Boat & Air"),
          ),
        );
      }
    }
  }, []);

  useEffect(
    function () {
      if (activeFiltersAll.length !== 0) {
        for (let i = 0; i < activeFiltersAll.length; i++) {
          searchParams.set(
            `${activeFiltersAll[i].filterName}`,
            activeFiltersAll[i].option
              .replaceAll("&", "and")
              .replaceAll(",", "")
              .split(" ")
              .join("-"),
          );
          setSearchParams(searchParams);
        }
      }
    },
    [activeFiltersAll.length],
  );

  return (
    <>
      <div className="mt-5 flex items-center gap-x-2 overflow-x-auto pb-3 md:hidden">
        <button
          onClick={() => {
            setAreOpenFilters([true, ""]);
          }}
          className="flex-shrink-0 text-sm"
        >
          <div
            className={`${
              activeFilters.length !== 0 ? "bg-blue-600 text-white" : ""
            } rounded-full border-2 px-5 py-[0.65rem]`}
          >
            <FontAwesomeIcon icon={faFilter} className="me-1" />
            Filters {activeFilters.length !== 0 && `(${activeFilters.length})`}
          </div>
        </button>
        {filtersOrder.map((f) => (
          <FilterPill
            key={f.filterName}
            filterName={`${f.filterName}`}
            setAreOpenFilters={setAreOpenFilters}
          />
        ))}
        {activeFilters.length !== 0 && (
          <button
            onClick={() => {
              removeAllFiltersUrl();
            }}
            className="flex-shrink-0 rounded-md px-8 py-3 text-sm font-medium text-blue-700 hover:bg-stone-100"
          >
            Clear All
          </button>
        )}
      </div>
      {areOpenFilters[0] && (
        <FiltersMobileModal
          areOpenFilters={areOpenFilters}
          setAreOpenFilters={setAreOpenFilters}
        />
      )}
      <div className="flex justify-between gap-x-20">
        <FiltersSidebar areOpenFilters={areOpenFilters} />
        <div className="hidden w-full flex-col gap-y-5 md:flex">
          {locations.map((location) => (
            <div
              key={location.city}
              role="button"
              onMouseOver={() => setState(location.location)}
              onMouseOut={() => setState([])}
              className="h-16 bg-red-200"
            >
              {location.city}{" "}
              <span className="ms-14 text-xs">--TESTING ONLY--</span>
            </div>
          ))}

          <ActiveFilters />
        </div>
      </div>
    </>
  );
}

export default Filters;
