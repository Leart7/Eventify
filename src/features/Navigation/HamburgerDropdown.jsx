import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faAngleUp,
  faCircleQuestion,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HelpCenterDropdown from "./HelpCenterDropdown";
import { useDropdown } from "../../hooks/useDropdown";
import CreateEventsDropdown from "./CreateEventsDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDropdown } from "../../redux/activeDropdownSlice";

function HamburgerDropdown({ isCreateClicked, setIsCreateClicked }) {
  const dispatch = useDispatch();
  const { activeDropdown } = useSelector((store) => store.activeDropdown);

  const {
    isOpen: isHelpClicked,
    setIsOpen: setIsHelpClicked,
    dropdownRef,
  } = useDropdown(false, true);

  return (
    <div className="absolute -right-5 top-[3.3rem] z-[1000] w-60">
      <ul className="flex flex-col rounded-md bg-white text-sm shadow-sm">
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          <FontAwesomeIcon icon={faTicket} className="me-3" /> Find Events
        </li>
        <li
          role="button"
          onClick={(e) => {
            dispatch(setActiveDropdown("createEvent"));
            setIsCreateClicked(!isCreateClicked);
            e.stopPropagation();
          }}
          className="relative w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          <FontAwesomeIcon icon={faCalendar} className="me-3" /> Create Events{" "}
          {!isCreateClicked ? (
            <FontAwesomeIcon
              icon={faAngleDown}
              className="absolute right-5 top-5"
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleUp}
              className="absolute right-5 top-5"
            />
          )}
        </li>
        {isCreateClicked &&
          activeDropdown[activeDropdown.length - 1] === "createEvent" && (
            <CreateEventsDropdown />
          )}
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className="w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Create Events
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className="w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Contact Sales
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className="w-full px-3 py-4 font-medium text-blue-600 hover:cursor-pointer hover:bg-stone-100"
        >
          Get Started
        </li>
        <li
          role="button"
          onClick={(e) => {
            setIsHelpClicked(!isHelpClicked);
            e.stopPropagation();
          }}
          className="relative w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
          ref={dropdownRef}
        >
          <FontAwesomeIcon icon={faCircleQuestion} className="me-3" /> Help
          Center{" "}
          {!isHelpClicked ? (
            <FontAwesomeIcon
              icon={faAngleDown}
              className="absolute right-5 top-5"
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleUp}
              className="absolute right-5 top-5"
            />
          )}
          {isHelpClicked && <HelpCenterDropdown from="hamburger" />}
        </li>
      </ul>
    </div>
  );
}

export default HamburgerDropdown;
