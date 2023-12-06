import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { deleteFilter } from "../redux/filtersSlice";
import { useSearchParams } from "react-router-dom";

function FilterPill({ filterName, setAreOpenFilters }) {
  const dispatch = useDispatch();
  const filtersSlice = useSelector((store) => store.filters.filters);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilters = filtersSlice.filter((f) => f.option.length !== 0);

  const activeFiltersCategories = filtersSlice
    .filter((f) => f.option.length !== 0)
    .map((f) => f.filterName);

  return (
    <button
      onClick={() => setAreOpenFilters([true, filterName])}
      className={`flex-shrink-0 text-sm`}
    >
      <div
        className={`${
          activeFiltersCategories.includes(filterName)
            ? "bg-blue-600 text-white"
            : ""
        } rounded-full border-2 px-5 py-[0.65rem]`}
      >
        {activeFiltersCategories.includes(filterName)
          ? `${activeFilters.find((f) => f.filterName === filterName).option}`
          : `${filterName}`}{" "}
        {activeFiltersCategories.includes(filterName) ? (
          <FontAwesomeIcon
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                deleteFilter(
                  activeFilters.find((f) => f.filterName === filterName).option,
                ),
              );
              searchParams.delete(filterName);
              setSearchParams(searchParams);
            }}
            icon={faXmark}
            className="ms-3 translate-y-[0.15rem]"
          />
        ) : (
          <FontAwesomeIcon
            icon={faAngleDown}
            className="translate-y-[0.15rem]"
          />
        )}
      </div>
    </button>
  );
}

export default FilterPill;
