import { useDispatch } from "react-redux";
import { addFilter, deleteFilter } from "../redux/filtersSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setActiveLocationFilter } from "../redux/activeLocationFilterSlice";
import { useState } from "react";

function FilterCheckboxes() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="flex items-center">
        <input
          id="eventsFollow"
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            setIsChecked(!isChecked);
            navigate("/following");
          }}
          className="h-5 w-5 rounded-sm border-2 border-gray-400 hover:cursor-pointer"
        />
        <label htmlFor="eventsFollow" className="ms-2 w-full text-[0.815rem]">
          Only show events from
          <br /> organizers I follow
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="Online"
          onChange={() => {
            const newSearchParams = new URLSearchParams(searchParams);
            if (newSearchParams.get("Online")) {
              newSearchParams.delete("Online");
              dispatch(deleteFilter("Online"));
            } else {
              newSearchParams.set("Online", "Online");
              newSearchParams.delete("box");
              newSearchParams.delete("zoom");
              dispatch(addFilter("Online", "Online"));
              dispatch(setActiveLocationFilter(""));
            }
            setSearchParams(newSearchParams);
          }}
          checked={searchParams.get("Online") === "Online"}
          type="checkbox"
          className="h-5 w-5 rounded-sm border-2 border-gray-400 hover:cursor-pointer"
        />
        <label htmlFor="Online" className="ms-2 w-full text-[0.815rem]">
          Search for online events
        </label>
      </div>
    </>
  );
}

export default FilterCheckboxes;
