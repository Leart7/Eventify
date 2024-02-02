import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { deleteFilter } from "../redux/filtersSlice";
import useRemoveFiltersUrl from "../hooks/useRemoveFiltersUrl";

function ActiveFilters({ areOpenFilters }) {
  const dispatch = useDispatch();
  const filtersSlice = useSelector((store) => store.filters.filters);

  const { removeAllFiltersUrl } = useRemoveFiltersUrl();

  const activeFilters = filtersSlice
    .filter((f) => f.filterName !== "Search")
    .map((f) => f.option)
    .filter((f) => f.length !== 0);

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      {activeFilters.length !== 0 && (
        <div className="mb-3 flex items-center gap-x-2 overflow-x-auto pb-3 text-[0.815rem] font-medium">
          <p className="hidden  flex-shrink-0 font-normal md:block">
            {activeFilters.length}{" "}
            {`${activeFilters.length === 1 ? "filter" : "filters"}`} applied
          </p>
          {activeFilters.map((f) => (
            <div
              key={f}
              className="flex-shrink-0 rounded-full bg-stone-100 px-3 py-2 "
            >
              {f}{" "}
              <FontAwesomeIcon
                role="button"
                onClick={() => {
                  dispatch(deleteFilter(f));
                  searchParams.delete(
                    filtersSlice.find((filter) => filter.option === f)
                      .filterName,
                  );
                  setSearchParams(searchParams);
                }}
                icon={faXmark}
                className="ms-4 hover:cursor-pointer"
              />
            </div>
          ))}
          <button
            onClick={() => {
              removeAllFiltersUrl();
            }}
            className="flex-shrink-0 rounded-md px-8 py-3 text-sm font-medium text-blue-700 hover:bg-stone-100"
          >
            Clear All
          </button>
        </div>
      )}
    </>
  );
}

export default ActiveFilters;
