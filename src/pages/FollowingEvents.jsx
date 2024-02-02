import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../ui/Navbar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEventsFollowings } from "../reactQuery/useEventsFollowings";
import LikedEvent from "../ui/LikedEvent";

function FollowingEvents() {
  const navigate = useNavigate();
  const { eventsFollowings } = useEventsFollowings({
    pageNumber: 1,
  });

  return (
    <>
      <Navbar />
      <div className="mx-auto w-[90%] md:w-[70%] 2xl:w-1/2 ">
        <FontAwesomeIcon
          role="button"
          onClick={() => navigate(-1)}
          icon={faArrowLeft}
          className="mt-10 text-lg hover:cursor-pointer"
        />
        <h1
          className="mx-auto mb-3 text-center text-2xl font-bold lg:text-3xl"
          style={{ color: "#1e0a3c" }}
        >
          Events from Organizers you follow
        </h1>
        <div className="flex flex-col gap-y-2">
          {eventsFollowings?.events?.map((event) => (
            <LikedEvent key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}

export default FollowingEvents;
