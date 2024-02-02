import Navbar from "../ui/Navbar";
import SearchFilterAndImg from "../ui/SearchFilterAndImg";
import EventTimeOptions from "../ui/EventTimeOptions";
import TrendingSearches from "../ui/TrendingSearches";
import EventCard from "../ui/EventCard";

import OrganizersScroll from "../ui/OrganizersScroll";
import { useParams } from "react-router-dom";
import { useEvents } from "../reactQuery/useEvents";
import { useEffect, useState } from "react";
import NoEvents from "../ui/NoEvents";

function EventsLocationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allEvents, setAllEvents] = useState([]);

  const { city } = useParams();
  const { events } = useEvents({
    city: city,
    pageNumber: currentPage,
  });

  useEffect(() => {
    setAllEvents([]);
  }, []);

  useEffect(() => {
    if (events && events.events) {
      setAllEvents((prevEvents) => [...prevEvents, ...events.events]);
    }
  }, [events]);

  return (
    <div>
      <Navbar />
      <SearchFilterAndImg />
      {allEvents?.length > 0 ? (
        <>
          <div className="m-auto mt-10 flex w-[87%] flex-wrap  ">
            {allEvents?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {currentPage < events?.totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="hover:bg-stone-5 mx-auto block w-1/4 transform rounded-md border-2 border-gray-400 bg-stone-50 px-7 py-2 text-sm font-medium transition-all duration-150 hover:border-gray-500 hover:bg-gray-100"
            >
              See More
            </button>
          )}
        </>
      ) : (
        <NoEvents />
      )}
      <TrendingSearches />
      <div className="m-auto w-[87%] pt-14">
        <OrganizersScroll />
      </div>

      <EventTimeOptions />
    </div>
  );
}

export default EventsLocationPage;
