import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropdown } from "../../hooks/useDropdown";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Sidebar() {
  const { isOpen, setIsOpen, dropdownRef } = useDropdown(true, true);

  return (
    <>
      <div
        className={`fixed inset-0 top-16 z-50 h-screen w-72 cursor-auto bg-gray-100`}
      >
        <ul className=" flex flex-col text-sm font-normal">
          <li
            role="button"
            onClick={(e) => {
              setIsOpen(!isOpen);
              e.stopPropagation();
            }}
            className="flex w-full items-center justify-between px-3 py-4 text-lg font-semibold hover:cursor-pointer"
          >
            Account{" "}
            {isOpen ? (
              <FontAwesomeIcon icon={faAngleUp} className="text-sm" />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} className="text-sm" />
            )}
          </li>
          {isOpen && (
            <>
              <Link
                role="button"
                to="/account-settings"
                onClick={(e) => e.stopPropagation()}
                className={`w-full px-7 py-4 hover:cursor-pointer hover:bg-white ${
                  window.location.pathname === "/account-settings" && "bg-white"
                }`}
              >
                Contact Info
              </Link>
              <Link
                to="/account-settings/change-email"
                role="button"
                onClick={(e) => e.stopPropagation()}
                className={`w-full px-7 py-4 hover:cursor-pointer hover:bg-white ${
                  window.location.pathname ===
                    "/account-settings/change-email" && "bg-white"
                }`}
              >
                Change Email
              </Link>
              <Link
                role="button"
                to="/account-settings/password"
                onClick={(e) => e.stopPropagation()}
                className={`w-full px-7 py-4 hover:cursor-pointer hover:bg-white ${
                  window.location.pathname === "/account-settings/password" &&
                  "bg-white"
                }`}
              >
                Password
              </Link>
              <Link
                role="button"
                to="/account-settings/close-account"
                onClick={(e) => e.stopPropagation()}
                className={`w-full px-7 py-4 hover:cursor-pointer hover:bg-white ${
                  window.location.pathname ===
                    "/account-settings/close-account" && "bg-white"
                }`}
              >
                Close Account
              </Link>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
