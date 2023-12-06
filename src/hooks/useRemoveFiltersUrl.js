import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { clearFilters } from "../redux/filtersSlice";

function useRemoveFiltersUrl() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  function removeAllFiltersUrl() {
    searchParams.delete("Date");
    searchParams.delete("Category");
    searchParams.delete("Format");
    searchParams.delete("Price");
    searchParams.delete("Language");
    searchParams.delete("Currency");
    searchParams.delete("Online");
    searchParams.delete("Search");

    dispatch(clearFilters());

    setSearchParams(searchParams);
  }

  return { removeAllFiltersUrl };
}

export default useRemoveFiltersUrl;
