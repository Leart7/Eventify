import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function CloseSearchModal({ setClickedModal }) {
  const [showUnderline, setShowUnderline] = useState(false);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("closeSearchDiv");
      if (window.scrollY > el.clientHeight) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        id="closeSearchDiv"
        role="button"
        onClick={() => setClickedModal(false)}
        onMouseEnter={() => setShowUnderline(true)}
        onMouseLeave={() => setShowUnderline(false)}
        className={`fixed left-0 right-0 top-0 z-[1000] flex flex-col bg-white text-center text-3xl text-gray-400 lg:hidden ${
          shadow ? "shadow-md" : ""
        }`}
      >
        <FontAwesomeIcon icon={faAngleDown} className="pt-1" />
        <hr
          className={`mx-auto w-12 border-2 border-gray-400 ${
            showUnderline ? "transition-fade-in" : "transition-fade-out"
          }`}
        ></hr>
      </div>
      <div
        role="button"
        onClick={() => setClickedModal(false)}
        className="absolute right-3 top-0 mt-2 hidden h-[39px] w-[39px] items-center justify-center rounded-full pt-1 text-center hover:cursor-pointer hover:bg-stone-100 lg:flex"
      >
        <FontAwesomeIcon icon={faXmark} className="pb-1" />
      </div>
    </>
  );
}

export default CloseSearchModal;
