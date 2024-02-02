import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function LikeSignInModal({ setClickedModal, clickedEvent }) {
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
        <p className="text-2xl font-semibold" style={{ color: "#1e0a3c" }}>
          Sign in to save this event
        </p>
        <div
          role="button"
          className={` flex w-[80%] gap-x-5 rounded-lg bg-white p-4  hover:cursor-pointer hover:border hover:shadow-md md:mt-0`}
        >
          <div>
            <h1 className="font-semibold md:text-lg">{clickedEvent.title}</h1>
          </div>
          <div className="flex flex-col items-end gap-y-3">
            <img
              src={clickedEvent.imageUrls[0]}
              className="my-auto h-[7rem] max-w-[12rem] rounded-md"
            />
          </div>
        </div>
        <p className="mb-5 text-sm">
          Save it, find it, and we'll show you other events like it
        </p>
        <Link
          role="button"
          onClick={() => {
            localStorage.setItem("likedEvent", JSON.stringify(clickedEvent));
          }}
          to="/login"
          className=" flex- w-[35%] rounded-md bg-orange-600 px-8 py-3 text-center font-medium text-white"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

export default LikeSignInModal;
