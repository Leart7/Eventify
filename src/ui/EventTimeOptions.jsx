import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFilter } from "../redux/filtersSlice";
import { setCity } from "../redux/searchModalCitySlice";
import { useCities } from "../hooks/useCities";
import { setActiveLocationFilter } from "../redux/activeLocationFilterSlice";
import { setAreaLocation } from "../redux/mapAreaSlice";

const dateFilters = [
  "Today",
  "Tomorrow",
  "This weekend",
  "This week",
  "Next week",
  "This month",
  "Next month",
];

export default function EventTimeOptions() {
  const { city } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cities } = useCities();
  const cityFilter = cities?.results?.find((cityy) => cityy.name === city);

  return (
    <>
      <h2 className="ml-28 pt-12 text-2xl font-bold text-[#444552]">
        Event time options
      </h2>
      <section
        className="ml-[7%] mt-11 flex h-36 w-[86%] gap-7 overflow-x-scroll bg-slate-300 px-7 pt-6 "
        style={{ display: "-webkit-box" }}
      >
        {dateFilters.map((dateFilter) => (
          <div
            role="button"
            onClick={() => {
              dispatch(addFilter("Date", dateFilter));
              dispatch(setActiveLocationFilter(`${city}`));
              dispatch(
                setAreaLocation([
                  cityFilter.location.latitude,
                  cityFilter.location.longitude,
                ]),
              );
              dispatch(
                setCity([
                  cityFilter.location.latitude,
                  cityFilter.location.longitude,
                  city,
                ]),
              );
              navigate("/filter-events");
            }}
            key={dateFilter}
            className="relative flex  h-[95px]  w-[290px] gap-x-8 bg-white "
          >
            <div className="absolute left-[-12px] top-[-12px] flex h-[72px] w-[72px] items-center justify-center rounded-full bg-slate-300">
              <span className="text-xl text-blue-700">
                <FontAwesomeIcon icon={faClock} />
              </span>
            </div>
            <p className="leading-7tracking-tight w-full pt-8 text-center font-semibold text-[#3659e3]  hover:underline	">
              {" "}
              <Link to="#"> {dateFilter} </Link>{" "}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
