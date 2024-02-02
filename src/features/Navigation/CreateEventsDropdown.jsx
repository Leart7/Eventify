import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setActiveDropdown } from "../../redux/activeDropdownSlice";
import { useDropdown } from "../../hooks/useDropdown";

function CreateEventsDropdown() {
  const {
    isOpen: isSolutionsClicked,
    setIsOpen: setIsSolutionsClicked,
    dropdownRef: solutionsDropdownRef,
  } = useDropdown(false, true);

  const dispatch = useDispatch();

  return (
    <>
      <li
        role="button"
        onClick={(e) => {
          setIsSolutionsClicked(!isSolutionsClicked);
          e.stopPropagation();
          dispatch(setActiveDropdown("solutions"));
        }}
        className="relative w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        ref={solutionsDropdownRef}
      >
        Solutions{" "}
        <FontAwesomeIcon
          icon={faAngleRight}
          className="absolute right-5 top-5"
        />
      </li>
      <li
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setActiveDropdown("industry"));
        }}
        className="relative w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
      >
        Industry{" "}
        <FontAwesomeIcon
          icon={faAngleRight}
          className="absolute right-5 top-5"
        />
      </li>
      <li
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setActiveDropdown("eventtypes"));
        }}
        className="relative w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
      >
        Event types{" "}
        <FontAwesomeIcon
          icon={faAngleRight}
          className="absolute right-5 top-5"
        />
      </li>
      <li
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setActiveDropdown("blog"));
        }}
        className="relative w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
      >
        Blog{" "}
        <FontAwesomeIcon
          icon={faAngleRight}
          className="absolute right-5 top-5"
        />
      </li>
    </>
  );
}

export default CreateEventsDropdown;
