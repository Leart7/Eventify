import {
  faAngleDown,
  faAngleUp,
  faBars,
  faSearch,
  faTicket,
  faUser,
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
import SearchPage from "../pages/SearchPage";

import {
  setActiveDropdown,
  removeAllActiveDropdown,
} from "../redux/activeDropdownSlice";
import { useEffect, useState } from "react";
import UserAccountDropdown from "../features/Navigation/UserAccountDropdown";
import { useModalCloser } from "../hooks/useModalCloser";
import { useUser } from "../reactQuery/useUser";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useLikeEvent } from "../reactQuery/useLikeEvent";
import { useQueryClient } from "@tanstack/react-query";
import { useLikes } from "../reactQuery/useLikes";
import { useFollowOrganizer } from "../reactQuery/useFollowOrganizer";

function Navbar() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { like } = useLikeEvent();
  const { likes } = useLikes();
  const { follow } = useFollowOrganizer();
  const { activeDropdown } = useSelector((store) => store.activeDropdown);

  const [clickedModal, setClickedModal] = useModalCloser();

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
  const {
    isOpen: isUserAccountClicked,
    setIsOpen: setIsUserAccountClicked,
    dropdownRef: userAccountRef,
  } = useDropdown(false, true);

  const [isCreateClicked, setIsCreateClicked] = useState(false);

  const alreadyLikedEvents = likes?.map((like) => like.event.id);

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
      if (clickedModal) {
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
  }, [clickedModal]);

  useEffect(
    function () {
      if (window.location.hash === "#search") {
        setClickedModal(true);
      } else {
        setClickedModal(false);
      }
    },
    [setClickedModal],
  );

  useEffect(function () {
    if (localStorage.getItem("likedEvent")) {
      const event = JSON.parse(localStorage.getItem("likedEvent"));

      like({ eventId: event.id });

      localStorage.removeItem("likedEvent");
      queryClient.refetchQueries({ queryKey: ["likes"] });
    }

    if (localStorage.getItem("organizer")) {
      const organizer = JSON.parse(localStorage.getItem("organizer"));

      follow({ followedUserId: organizer.followedUserId });

      localStorage.removeItem("organizer");
    }
  }, []);

  return (
    <>
      {!clickedModal && (
        <div className="fixed left-0 top-0 z-[1000] flex w-full items-center justify-between border-b bg-stone-50 px-6 py-[0.6rem] lg:border-none">
          <div className="flex max-w-sm items-center gap-x-5 xs:flex-grow">
            <Link to="/" className="font-bold text-orange-600  lg:hidden">
              <img
                src="/eventifyIcon.png"
                className="absolute inset-0 left-6 top-5 w-6"
              />
            </Link>
            <Link
              to="/"
              className="hidden flex-shrink-0 text-2xl font-bold text-orange-600 lg:block"
            >
              <img src="/eventifyLogo.png" className={`w-20`} />
            </Link>
            {showSearch && (
              <div
                role="button"
                onClick={() => setClickedModal(true)}
                className=" ms-7 flex-shrink-0 flex-grow rounded-full  border bg-gray-100 px-4 py-[0.7rem] pe-10 text-sm font-medium hover:cursor-pointer lg:ms-0 "
              >
                <span className="me-2">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <span>Search events</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-x-5">
            {!user && (
              <Link
                role="button"
                to="/"
                className="hidden text-sm font-medium lg:block "
              >
                <div className="rounded-full px-3 py-2 hover:bg-stone-100">
                  Find Events
                </div>
              </Link>
            )}

            <Link
              to="/create-events"
              className="hidden text-sm font-medium lg:block "
            >
              <div className="rounded-full px-3 py-2 hover:bg-stone-100">
                Create Events
              </div>
            </Link>

            {user && (
              <>
                <Link
                  to="/favorites/events"
                  className="hidden text-sm font-medium lg:block "
                >
                  <div className="flex flex-col items-center rounded-full px-3 py-2 hover:bg-stone-100">
                    <FontAwesomeIcon icon={faHeart} className="text-lg" />
                    <p>Likes</p>
                  </div>
                </Link>

                <Link
                  to="/tickets"
                  className="hidden text-sm font-medium lg:block "
                >
                  <div className="flex flex-col items-center rounded-full px-3 py-2 hover:bg-stone-100">
                    <FontAwesomeIcon icon={faTicket} className="text-lg" />
                    <p>Tickets</p>
                  </div>
                </Link>
              </>
            )}

            {!user && (
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
            )}

            {!user && (
              <>
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
              </>
            )}

            {user && (
              <>
                <div
                  role="button"
                  onClick={() => setIsUserAccountClicked(!isUserAccountClicked)}
                  className="flex items-center gap-x-3 rounded-full px-3 py-2 hover:cursor-pointer hover:bg-stone-100 lg:hidden"
                  ref={userAccountRef}
                >
                  <FontAwesomeIcon icon={faUser} />{" "}
                  <p className="hidden lg:inline-block">{user?.email}</p>
                  {isUserAccountClicked && <UserAccountDropdown />}
                </div>

                <div
                  role="button"
                  onMouseOver={() => setIsUserAccountClicked(true)}
                  onMouseOut={() => setIsUserAccountClicked(false)}
                  className="hidden items-center gap-x-3 rounded-full px-3 py-2 hover:cursor-pointer hover:bg-stone-100 lg:flex"
                  ref={userAccountRef}
                >
                  <FontAwesomeIcon icon={faUser} />{" "}
                  <p className="hidden lg:inline-block">{user?.email}</p>
                  {isUserAccountClicked && (
                    <UserAccountDropdown email={user?.email} />
                  )}
                </div>
              </>
            )}

            {!user && (
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
            )}
          </div>
        </div>
      )}
      {clickedModal && (
        <SearchPage
          clickedModal={clickedModal}
          setClickedModal={setClickedModal}
        />
      )}
    </>
  );
}

export default Navbar;
