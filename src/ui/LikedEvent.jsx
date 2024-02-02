import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../utils/helpers";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDislikeEvent } from "../reactQuery/useDislikeEvent";
import { useLikeEvent } from "../reactQuery/useLikeEvent";
import { useLikes } from "../reactQuery/useLikes";
import { Link } from "react-router-dom";

function LikedEvent({ event, like }) {
  const { likes } = useLikes();

  const { dislike } = useDislikeEvent();
  const { like: likeEvent } = useLikeEvent();

  const isEventLiked = likes?.map((like) => like.event.id).includes(event.id);

  const likeId = likes?.find((like) => like.event.id === event.id)?.id;

  return (
    <Link
      to={`/event-details/${event.id}`}
      target="_blank"
      role="button"
      className={` flex w-[98%] justify-between gap-x-5 rounded-lg bg-white  p-4 hover:cursor-pointer hover:border hover:shadow-md md:mt-0`}
    >
      <div>
        <h1 className="font-semibold md:text-lg">{event.title}</h1>
        <p className="text-sm text-orange-600 md:text-base">
          {formatDate(event.startTime)}
        </p>
        <p>{event?.city}</p>
        <p className="text-sm font-medium md:text-base ">
          {event?.price && "€"}
          {event?.price?.toFixed(2) || "Free"}
        </p>
      </div>
      <div className="flex flex-col items-end gap-y-3">
        <img
          src={event.imageUrls[0]}
          className="my-auto h-[7rem] max-w-[12rem] rounded-md"
        />
        <div
          role="button"
          onClick={(e) => {
            e.preventDefault();
            if (isEventLiked) {
              dislike(likeId || like);
            } else {
              likeEvent({ eventId: event.id });
            }
          }}
          className="flex h-12 w-12 cursor-pointer items-center justify-center  rounded-full border-2 border-[#dbdae3] bg-white text-[#4b4d63] hover:bg-[#f8f7fa]"
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`${isEventLiked && "text-orange-600"}`}
          />
        </div>
      </div>
    </Link>
  );
}

export default LikedEvent;
