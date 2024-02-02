import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addFilter } from "../../redux/filtersSlice";

function RecentAndPopularSearches() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recentSearches = JSON.parse(localStorage.getItem("recentSearches"));

  return (
    <div className="mt-10 pb-3 md:w-[46%] lg:w-[85%] xl:w-[70%]">
      <h2 className="text-xl font-bold lg:text-2xl">
        Recent and popular searches
      </h2>
      <div className="mt-3 flex flex-col">
        {recentSearches &&
          recentSearches.reverse().map((search) => (
            <div
              role="button"
              onClick={() => {
                navigate("/filter-events");
                dispatch(addFilter("Search", search));
              }}
              key={search}
              className="px-5 py-4 hover:cursor-pointer hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faClock} className="me-3 text-gray-400" />{" "}
              {search}
            </div>
          ))}
        <div
          role="button"
          onClick={() => {
            navigate("/filter-events");
            dispatch(addFilter("Search", "stern-grove"));
          }}
          className="px-5 py-4 hover:cursor-pointer hover:bg-gray-100"
        >
          <FontAwesomeIcon
            icon={faArrowTrendUp}
            className="me-3 text-gray-400"
          />{" "}
          stern-grove
        </div>
        <div
          role="button"
          onClick={() => {
            navigate("/filter-events");
            dispatch(addFilter("Search", "asdasd"));
          }}
          className="px-5 py-4 hover:cursor-pointer hover:bg-gray-100"
        >
          <FontAwesomeIcon
            icon={faArrowTrendUp}
            className="me-3 text-gray-400"
          />{" "}
          asdasd
        </div>
      </div>
    </div>
  );
}

export default RecentAndPopularSearches;
