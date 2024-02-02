import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter } from "../../redux/filtersSlice";
import { useSearchParams } from "react-router-dom";

function FiltersOptions({ options, filter, areOpenFilters }) {
  const [viewMore, setViewMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const filters = useSelector((store) => store.filters.filters);

  const activeFiltersOptions = filters
    .map((f) => f.option)
    .filter((f) => f.length !== 0);

  const slicedOptions = options?.slice(0, 4);

  const optionToRender = viewMore ? options : slicedOptions;

  useEffect(
    function () {
      if (areOpenFilters[1] === filter) setViewMore(true);
    },
    [areOpenFilters, filter],
  );

  return (
    <>
      {optionToRender?.map((option) => (
        <div key={option} className="flex items-center">
          <input
            id={`${option}`}
            type="radio"
            name={filter}
            value={option}
            checked={activeFiltersOptions.includes(option)}
            onChange={() => {
              dispatch(addFilter(filter, option));
              searchParams.set(
                `${filter}`,
                option
                  .replaceAll("&", "and")
                  .replaceAll(",", "")
                  .split(" ")
                  .join("-"),
              );
              setSearchParams(searchParams);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="h-5 w-5 border-2 border-gray-400 hover:cursor-pointer "
          />
          <label
            htmlFor={`${option}`}
            className="ms-2 w-full text-sm md:text-[0.815rem]"
          >
            {option}
          </label>
        </div>
      ))}
      {options?.length > 4 && (
        <p
          role="button"
          onClick={() => {
            setViewMore(!viewMore);
          }}
          className="text-[0.815rem] text-blue-700 underline-offset-2 hover:cursor-pointer hover:underline md:-mt-1"
        >
          {viewMore ? "View less" : "View more"}
        </p>
      )}
    </>
  );
}

export default FiltersOptions;
