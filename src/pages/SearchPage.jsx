import { useEffect } from "react";
import SearchModalLayout from "../features/SearchModal/SearchModalLayout";
import { useDispatch } from "react-redux";
import { setSearchModalClicked } from "../redux/searchClickedSlice";

function SearchPage() {
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (window.location.hash === "#search") {
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") {
            dispatch(setSearchModalClicked(false));
          }
        });
      }
    },
    [dispatch],
  );

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 w-full xl:static xl:mx-auto xl:w-[85%] 2xl:w-3/4">
      <SearchModalLayout />
    </div>
  );
}

export default SearchPage;
