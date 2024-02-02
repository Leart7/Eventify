import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="mx-auto flex w-full flex-col items-center text-center lg:w-1/2">
        <img src="/noResultsFound.png" />
        <h1 className="text-5xl font-bold">
          Whoops, the page or event you are looking for was not found.
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="my-10 rounded-md bg-orange-600 px-14 py-3 font-medium text-white"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Go Back
        </button>
      </div>
    </>
  );
}

export default PageNotFound;
