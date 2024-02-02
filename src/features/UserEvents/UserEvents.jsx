import { useParams } from "react-router";
import { usePastEventsFromUser } from "../../reactQuery/usePastEventsFromUser";
import { useUpcomingEventsFromUser } from "../../reactQuery/useUpcomingEventsFromUser";
import EventCard from "../../ui/EventCard";
import { useEffect, useState } from "react";

function UserEvents() {
  const { name } = useParams();
  const userId = name?.split("-").slice(2, name.length).join("-");

  const { upcomingEvents } = useUpcomingEventsFromUser(userId);
  const { pastEvents } = usePastEventsFromUser(userId);

  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 960) {
        setActiveButton(null);
      }

      if (activeButton !== 1) {
        if (window.innerWidth > 1000) {
          setActiveButton(0);
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      <h1 className="my-5 ms-[12.5%] hidden text-3xl font-semibold lg:block">
        Events
      </h1>
      <div className="mb-3 ms-[12.5%] hidden  items-center gap-x-2 lg:flex">
        <button
          onClick={() => setActiveButton(0)}
          className={`flex-shrink-0 text-sm `}
        >
          <div
            className={`rounded-full border-2 px-5 py-[0.65rem] hover:bg-stone-50 ${
              activeButton === 0 &&
              "border border-blue-600 bg-stone-200 text-blue-600 hover:bg-stone-200"
            }`}
          >
            Upcoming ({upcomingEvents?.totalEvents})
          </div>
        </button>
        <button
          onClick={() => setActiveButton(1)}
          className={`flex-shrink-0 text-sm `}
        >
          <div
            className={`rounded-full border-2 px-5 py-[0.65rem] hover:bg-stone-50 ${
              activeButton === 1 &&
              "border border-blue-600 bg-stone-200 text-blue-600 hover:bg-stone-200"
            }`}
          >
            Past ({pastEvents?.totalEvents})
          </div>
        </button>
      </div>

      {(activeButton === null || activeButton === 0) &&
        upcomingEvents?.totalEvents > 0 && (
          <>
            <h2 className="ms-[12.5%] mt-5 text-2xl font-semibold lg:hidden">
              Upcoming ({upcomingEvents?.totalEvents})
            </h2>
            <div className="mx-auto flex w-3/4 flex-col flex-wrap gap-y-3 md:flex-row">
              {upcomingEvents?.events?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}

      {(activeButton === null || activeButton === 1) &&
        pastEvents?.totalEvents > 0 && (
          <div className="mt-5 bg-gray-200 py-7 lg:bg-transparent lg:py-0">
            <h2 className="ms-[12.5%] mt-5 text-2xl font-semibold lg:hidden">
              Past ({pastEvents?.totalEvents})
            </h2>
            <div className="mx-auto flex w-3/4 flex-col flex-wrap gap-y-3 md:flex-row">
              {pastEvents?.events?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
    </>
  );
}

export default UserEvents;
