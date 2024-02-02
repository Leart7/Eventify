import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../utils/helpers";
import { useLikeEvent } from "../reactQuery/useLikeEvent";
import { useLikes } from "../reactQuery/useLikes";
import { useDislikeEvent } from "../reactQuery/useDislikeEvent";
import { useUser } from "../reactQuery/useUser";
import { useModalCloser } from "../hooks/useModalCloser";
import { useState } from "react";
import LikeSignInModal from "./LikeSignInModal";
import Overlay from "./Overlay";
import { Link } from "react-router-dom";

export default function EventCard({ event, from }) {
  const { user } = useUser();
  const { like } = useLikeEvent();
  const { dislike } = useDislikeEvent();
  const { likes } = useLikes();

  const [clickedModal, setClickedModal] = useModalCloser();
  const [clickedEvent, setClickedEvent] = useState();

  const isEventLiked = likes?.map((like) => like.event.id).includes(event.id);

  const likeId = likes?.find((like) => like.event.id === event.id)?.id;

  return (
    <Link
      to={`/event-details/${event.id}`}
      className={`${
        from === "secondary"
          ? "w-[45%] "
          : " w-full sm:w-1/2  sm:px-2 md:w-1/3 md:px-4  md:py-4  xl:w-1/4"
      } relative px-0 py-2    `}
      style={{}}
    >
      <div
        className="h-96  rounded-xl bg-white shadow-custom hover:shadow-cutomHower"
        style={{ aspectRatio: "1/1" }}
      >
        <div className=" cursor-pointer" style={{ height: "53% " }}>
          <img
            className=" w-full rounded-xl border-[1px] border-[#dbdae3] object-cover"
            style={{ height: "100%" }}
            src={event.imageUrls[0]}
            alt=""
          />
        </div>
        <div className="px-4 py-8">
          <div className="cursor-pointer text-lg font-bold text-[#39364f]">
            {event.title.length > 35
              ? `${event.title.slice(0, 35)}...`
              : event.title}
          </div>
          <div className="mr-8 pb-1 pt-2 text-sm font-normal text-[#d1410c]">
            {formatDate(event.startTime)}
          </div>
          <aside className="mr-8 text-base  md:text-sm ">
            <div className="text-[#6f7287]">{event.city}</div>
            <div className="text-[#6f7287]">
              {event.price ? `${event.price}€` : "Free"}
            </div>
            {from !== "secondary" && (
              <div className="mt-2 pt-1 font-semibold text-[#39364f]">
                <div>
                  <FontAwesomeIcon icon={faUser} className="mr-2 " />{" "}
                  {event?.user?.firstName} {event?.user?.lastName}
                </div>
              </div>
            )}
          </aside>
        </div>
        <div
          role="button"
          onClick={(e) => {
            e.preventDefault();
            if (user) {
              if (isEventLiked) {
                dislike(likeId);
              } else {
                like({ eventId: event.id });
              }
            } else {
              setClickedEvent(event);
              setClickedModal(true);
            }
          }}
          className="absolute right-10 top-[8.9rem] flex h-12 w-12 cursor-pointer items-center justify-center  rounded-full border-2 border-[#dbdae3] bg-white text-[#4b4d63] hover:bg-[#f8f7fa]"
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`${isEventLiked && "text-orange-600"}`}
          />
        </div>
      </div>

      {clickedModal && (
        <>
          <LikeSignInModal
            clickedEvent={clickedEvent}
            setClickedModal={setClickedModal}
          />
          <Overlay />
        </>
      )}

      {/* <div className="absolute right-0 top-1 rounded-[14px] border-2 border-white bg-[#6f7287] px-[10px] py-[2px] text-center text-sm font-semibold text-white ">
        Sold out
      </div> */}
    </Link>
  );
}
