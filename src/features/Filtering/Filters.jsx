import {
  faAngleLeft,
  faAngleRight,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
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
import FilteredEvent from "./FilteredEvent";
import Pagination from "../../ui/Pagination";
import NoEventsResults from "../../ui/NoEventsResults";
import { useEventsFollowings } from "../../reactQuery/useEventsFollowings";
import { useGetFollowings } from "../../reactQuery/useGetFollowings";

function Filters({ setState, events, activeEvent, setActiveEvent, eventRef }) {
  const dispatch = useDispatch();
  const [areOpenFilters, setAreOpenFilters] = useState([false, ""]);
  const [searchParams, setSearchParams] = useSearchParams();

  const { followings } = useGetFollowings();

  const { eventsFollowings } = useEventsFollowings();

  useEffect(function () {
    if (areOpenFilters[0]) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  useEffect(
    function () {
      if (searchParams.get("page") > events?.totalPages) {
        searchParams.set("page", events?.totalPages);
        setSearchParams(searchParams);
      }
    },
    [events?.totalPages, searchParams, setSearchParams],
  );

  const { urlObj } = useUrlFilters();
  const { removeAllFiltersUrl } = useRemoveFiltersUrl();

  const activeFiltersUrl = urlObj.filter((f) => f.option);

  const filtersSlice = useSelector((store) => store.filters.filters);

  const activeFilters = filtersSlice
    .map((f) => f.option)
    .filter((f) => f.length !== 0);

  const activeFiltersAll = filtersSlice.filter((f) => f.option.length !== 0);

  const filtersOrder = filtersSlice.slice(0, 6).sort((a, b) => {
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
      <div className="sticky top-[3.78rem] z-50  flex items-center gap-x-2 overflow-x-auto bg-white py-5 pb-3 md:hidden">
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
        <div className="flex w-full flex-col gap-y-5">
          <div className="hidden md:flex">
            <ActiveFilters />
          </div>

          {events?.events?.length === 0 ? (
            <NoEventsResults />
          ) : (
            <>
              {events?.events?.map((event) => (
                <FilteredEvent
                  setState={setState}
                  key={event.id}
                  event={event}
                  activeEvent={activeEvent}
                  setActiveEvent={setActiveEvent}
                  eventRef={eventRef}
                />
              ))}
              {events?.totalPages > 1 && (
                <Pagination totalPages={events?.totalPages} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Filters;
