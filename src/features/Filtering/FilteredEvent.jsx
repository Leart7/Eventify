import { useEffect } from "react";
import { formatDate } from "../../utils/helpers";
import { Link } from "react-router-dom";

function FilteredEvent({
  event,
  setState,
  activeEvent,
  setActiveEvent,
  eventRef,
}) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeEvent && eventRef.current) {
        const clickedClassName = e.target.className;
        const isMarker = clickedClassName.includes("marker");

        if (!isMarker && !eventRef.current.contains(e.target)) {
          setActiveEvent(null);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeEvent, setActiveEvent]);

  useEffect(() => {
    if (activeEvent && eventRef.current) {
      const yOffset = -270;
      const y =
        eventRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      // Use requestAnimationFrame to wait for the DOM to update
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    }
  }, [activeEvent, eventRef]);

  return (
    <Link
      to={`/event-details/${event.id}`}
      id={`filteredEvent${event.id}`}
      ref={event.id === activeEvent ? eventRef : null}
      role="button"
      onMouseOver={() => setState([event.latitude, event.longitude])}
      onMouseOut={() => setState([])}
      className={`${
        activeEvent === event.id && "border shadow-md"
      } flex w-[98%] gap-x-5 rounded-lg bg-white p-4  hover:cursor-pointer hover:border hover:shadow-md md:mt-0`}
    >
      <img
        key={event.imageUrls[0]}
        src={event.imageUrls[0]}
        className="my-auto h-[7rem] max-w-[12rem] rounded-md"
      />
      <div>
        <h1 className="font-semibold md:text-lg">{event.title}</h1>
        <p className="text-sm md:text-base">{formatDate(event.startTime)}</p>
        <p>{event?.city}</p>
        <p className="text-sm font-medium md:text-base ">
          {event?.price && "€"}
          {event?.price?.toFixed(2) || "Free"}
        </p>
      </div>
    </Link>
  );
}

export default FilteredEvent;
