import { faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveToasterId } from "../redux/activeToasterSlice";

function Toaster({ t, text, link }) {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const { toastId } = useSelector((store) => store.activeToaster);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(
    function () {
      dispatch(setActiveToasterId(t.id));
    },
    [t.id],
  );

  return (
    <>
      {show && toastId === t.id && (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          }  pointer-events-auto mt-14 flex w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
          <div className="w-0 flex-1 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {text}{" "}
                  {link?.length !== 0 && (
                    <Link
                      role="button"
                      onClick={() => setShow(false)}
                      to="/tickets"
                      className="ms-8 text-blue-600 underline-offset-2 hover:underline"
                    >
                      {link} <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div
            role="button"
            onClick={() => {
              setShow(false);
              toast.dismiss(t.id);
            }}
            className="me-10 mt-2 h-[39px] w-[39px] items-center justify-center rounded-full pt-3 text-center hover:cursor-pointer hover:bg-stone-100 lg:flex lg:pt-1"
          >
            <FontAwesomeIcon icon={faXmark} className="pb-1" />
          </div>
        </div>
      )}
    </>
  );
}

export default Toaster;
