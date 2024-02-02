import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function OtherLoginSignupMethods({ from }) {
  const [dropdownClicked, setDropdownClicked] = useState(false);

  return (
    <>
      <div
        className={`${
          !dropdownClicked && "border-b"
        } mx-auto w-1/2  pb-1 text-center`}
        role="button"
        onClick={() => setDropdownClicked(!dropdownClicked)}
      >
        <p className="">
          {from === "signup" ? "Other signup methods" : "Other login methods"}
          {dropdownClicked ? (
            <FontAwesomeIcon icon={faAngleUp} className="ms-4" />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} className="ms-4" />
          )}
        </p>
      </div>
      {dropdownClicked && (
        <div className="mx-auto mt-4 flex items-center gap-x-14">
          {from !== "signup" && (
            <div
              role="button"
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: "#4B4D63" }}
            >
              <img src="appleLogo.png" className="w-7 px-1 pb-1" />
            </div>
          )}
          <div
            role="button"
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: "#1877F2" }}
          >
            <img src="facebookLogo.png" className="w-5 px-1 " />
          </div>
        </div>
      )}
    </>
  );
}

export default OtherLoginSignupMethods;
