import { useEffect, useRef, useState } from "react";
import Filters from "../features/Filtering/Filters";
import Map from "../features/Filtering/Map";
import SearchLocation from "../features/Filtering/SearchLocation";
import Navbar from "../ui/Navbar";
import { useEvents } from "../reactQuery/useEvents";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function FilteredMapPage() {
  const [state, setState] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeEvent, setActiveEvent] = useState(null);

  const city = useSelector((store) => store.searchModalCity);

  const eventRef = useRef(null);

  const [
    bottomLeftLongitude,
    bottomLeftLatitude,
    topRightLongitude,
    topRightLatitude,
  ] = (searchParams?.get("box") ?? "").split("&").map(Number);

  const { events } = useEvents({
    name: searchParams?.get("Search"),
    city: searchParams?.get("city")?.split("&")[2],
    bottomLeftLatitude,
    bottomLeftLongitude,
    topRightLatitude,
    topRightLongitude,
    online: searchParams?.get("Online") !== null,
    free: searchParams?.get("Price") === "Free",
    paid: searchParams?.get("Price") === "Paid",
    category: searchParams?.get("Category"),
    format: searchParams?.get("Format"),
    currency: searchParams?.get("Currency"),
    language: searchParams?.get("Language"),
    dateFilter: searchParams?.get("Date"),
    pageNumber: searchParams?.get("page") || 1,
  });

  useEffect(
    function () {
      if (!searchParams.get("page")) {
        searchParams.set("page", 1);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams],
  );

  useEffect(function () {
    if (city?.city?.length !== 0) {
      searchParams.set(
        "city",
        `${city?.city[0]}&${city?.city[1]}&${city?.city[2]}`,
      );
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col xl:w-[70%] 2xl:w-[60%]">
        <SearchLocation />
        <Filters
          state={state}
          setState={setState}
          events={events}
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
          eventRef={eventRef}
        />
      </div>
      <Map
        state={state}
        setState={setState}
        events={events}
        activeEvent={activeEvent}
        setActiveEvent={setActiveEvent}
        eventRef={eventRef}
      />
    </>
  );
}

export default FilteredMapPage;
