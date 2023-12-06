import {
  faAngleDown,
  faAngleUp,
  faBars,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import HelpCenterDropdown from "../features/Navigation/HelpCenterDropdown";
import HamburgerDropdown from "../features/Navigation/HamburgerDropdown";
import { useDropdown } from "../hooks/useDropdown";
import { useDispatch, useSelector } from "react-redux";
import SolutionsDropdown from "../features/Navigation/SolutionsDropdown";
import EventTypesDropdown from "../features/Navigation/EventTypesDropdown";
import IndustryDropdown from "../features/Navigation/IndustryDropdown";
import BlogDropdown from "../features/Navigation/BlogDropdown";
import { setSearchModalClicked } from "../redux/searchClickedSlice";
import SearchPage from "../pages/SearchPage";

import {
  setActiveDropdown,
  removeAllActiveDropdown,
} from "../redux/activeDropdownSlice";
import { useEffect, useState } from "react";

function Navbar() {
  const { activeDropdown } = useSelector((store) => store.activeDropdown);
  const { searchClicked } = useSelector((store) => store.searchClicked);

  const dispatch = useDispatch();

  const location = useLocation();
  const showSearch = location.pathname !== "/filter-events";

  const {
    isOpen: isHelpClicked,
    setIsOpen: setIsHelpClicked,
    dropdownRef,
  } = useDropdown(false, true);
  const {
    isOpen: isHamburgerClicked,
    setIsOpen: setIsHamburgerClicked,
    dropdownRef: hambDropdownRef,
  } = useDropdown(false, true);

  const [isCreateClicked, setIsCreateClicked] = useState(false);

  useEffect(
    function () {
      if (!isHamburgerClicked) {
        dispatch(removeAllActiveDropdown());
      }
    },
    [dispatch, isHamburgerClicked],
  );

  useEffect(() => {
    const updateHash = () => {
      if (searchClicked) {
        window.history.replaceState(null, null, "#search");
      } else {
        window.history.replaceState(
          null,
          null,
          window.location.pathname + window.location.search,
        );
      }
    };

    updateHash();
  }, [searchClicked]);

  useEffect(
    function () {
      if (window.location.hash === "#search") {
        dispatch(setSearchModalClicked(true));
      } else {
        dispatch(setSearchModalClicked(false));
      }
    },
    [dispatch],
  );

  return (
    <>
      {!searchClicked && (
        <div className="fixed left-0 top-0 z-[1000] flex w-full items-center justify-between border-b bg-stone-50 px-6 py-[0.6rem] lg:border-none">
          <div className="flex max-w-sm items-center gap-x-5 xs:flex-grow">
            <Link to="/" className="font-bold text-orange-600  lg:hidden">
              <img
                src="eventifyIcon.png"
                className="absolute inset-0 left-6 top-5 w-6"
              />
            </Link>
            <Link
              to="/"
              className="hidden flex-shrink-0 text-2xl font-bold text-orange-600 lg:block"
            >
              <img src="eventifyLogo.png" className={`w-20`} />
            </Link>
            {showSearch && (
              <div
                role="button"
                onClick={() => dispatch(setSearchModalClicked(true))}
                className=" ms-7 flex-shrink-0 flex-grow rounded-full  border bg-gray-100 px-4 py-[0.7rem] pe-10 text-sm font-medium hover:cursor-pointer lg:ms-0 "
              >
                <span className="me-2">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <span>Search events</span>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <Link
              role="button"
              to="/"
              className="hidden text-sm font-medium lg:block "
            >
              <div className="rounded-full px-3 py-2 hover:bg-stone-100">
                Find Events
              </div>
            </Link>

            <Link to="/" className="hidden text-sm font-medium lg:block ">
              <div className="rounded-full px-3 py-2 hover:bg-stone-100">
                Create Events
              </div>
            </Link>

            <Link
              role="button"
              onClick={() => setIsHelpClicked(!isHelpClicked)}
              className="relative hidden text-sm font-medium lg:block"
              ref={dropdownRef}
            >
              <div className="flex items-center rounded-full px-3 py-2 hover:bg-stone-100">
                Help Center{" "}
                {!isHelpClicked ? (
                  <FontAwesomeIcon icon={faAngleDown} className="ps-1 pt-1" />
                ) : (
                  <FontAwesomeIcon icon={faAngleUp} className="ps-1 pt-1" />
                )}
              </div>
              {isHelpClicked && <HelpCenterDropdown />}
            </Link>

            <Link to="/login" className="text-sm font-medium ">
              <div className="ms-2 rounded-full px-3 py-2 hover:bg-stone-100">
                Log In
              </div>
            </Link>

            <Link to="/signup" className="text-sm font-medium ">
              <div className="rounded-full px-3 py-2 hover:bg-stone-100">
                Sign Up
              </div>
            </Link>

            <div
              role="button"
              onClick={() => {
                {
                  dispatch(setActiveDropdown("hamburger"));
                  setIsHamburgerClicked(!isHamburgerClicked);
                }
              }}
              className="relative rounded-full px-3 py-2 hover:cursor-pointer hover:bg-stone-100 lg:hidden"
              ref={hambDropdownRef}
            >
              {!isHamburgerClicked ? (
                <FontAwesomeIcon icon={faBars} />
              ) : (
                <FontAwesomeIcon icon={faXmark} />
              )}
              {isHamburgerClicked &&
                (activeDropdown[activeDropdown.length - 1] === "hamburger" ||
                  activeDropdown[activeDropdown.length - 1] ===
                    "createEvent") && (
                  <HamburgerDropdown
                    isCreateClicked={isCreateClicked}
                    setIsCreateClicked={setIsCreateClicked}
                  />
                )}
              {activeDropdown[activeDropdown.length - 1] === "solutions" && (
                <SolutionsDropdown setIsCreateClicked={setIsCreateClicked} />
              )}
              {activeDropdown[activeDropdown.length - 1] === "eventtypes" && (
                <EventTypesDropdown setIsCreateClicked={setIsCreateClicked} />
              )}
              {activeDropdown[activeDropdown.length - 1] === "industry" && (
                <IndustryDropdown setIsCreateClicked={setIsCreateClicked} />
              )}
              {activeDropdown[activeDropdown.length - 1] === "blog" && (
                <BlogDropdown setIsCreateClicked={setIsCreateClicked} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
