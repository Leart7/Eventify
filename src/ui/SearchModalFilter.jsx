import { useDispatch } from "react-redux";
import { addFilter } from "../redux/filtersSlice";
import { useNavigate } from "react-router";

function SearchModalFilter({ filterName, filterOption }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(addFilter(filterName, filterOption));
        navigate(`/filter-events`);
      }}
      className="flex-shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium  hover:bg-gray-200 "
    >
      {filterOption}
    </button>
  );
}

export default SearchModalFilter;
