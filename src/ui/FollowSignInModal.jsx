import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function FollowSignInModal({ setClickedModal, clickedOrganizer }) {
  return (
    <div className="fixed inset-0 z-[500000] h-full w-full bg-white shadow-2xl lg:left-1/2 lg:top-1/2 lg:h-96 lg:w-[38rem] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:overflow-y-auto lg:rounded-lg ">
      <div
        role="button"
        onClick={() => setClickedModal(false)}
        className="me-2 ms-auto mt-2 flex h-[39px] w-[39px] items-center justify-center rounded-full  text-center hover:cursor-pointer hover:bg-stone-100"
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <div className="mx-auto flex flex-col items-center gap-y-5">
        <div className="mb-4 h-[74px] w-[74px] cursor-pointer overflow-hidden rounded-full">
          <img className="h-full w-full" src={clickedOrganizer.imageUrl} />
        </div>
        <p className="text-2xl font-semibold" style={{ color: "#1e0a3c" }}>
          Sign in to follow {clickedOrganizer.firstName}{" "}
          {clickedOrganizer.lastName}
        </p>
        <p className="mb-5 text-sm">
          Stay up on the latest from your favorite event organizers
        </p>
        <Link
          role="button"
          onClick={() =>
            localStorage.setItem("organizer", JSON.stringify(clickedOrganizer))
          }
          to="/login"
          className=" flex- w-[35%] rounded-md bg-orange-600 px-8 py-3 text-center font-medium text-white"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default FollowSignInModal;
