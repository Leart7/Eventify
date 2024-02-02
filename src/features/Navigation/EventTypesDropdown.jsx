import { useDispatch } from "react-redux";
import { removeActiveDropdown } from "../../redux/activeDropdownSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function EventTypesDropdown({ setIsCreateClicked }) {
  const dispatch = useDispatch();

  return (
    <div className={`absolute -right-5 top-[3.3rem] z-50 w-60 text-sm`}>
      <ul className=" flex flex-col rounded-md bg-white shadow-sm">
        <li
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(removeActiveDropdown());
            setIsCreateClicked(true);
          }}
          className=" w-full px-3 py-4 ps-4 hover:cursor-pointer hover:bg-stone-100"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="me-4" />
          Event Types
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Concerts
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Classes & Workshops
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Festivals & Fairs
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Conferences
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Corporate Events
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Online Events
        </li>
      </ul>
    </div>
  );
}

export default EventTypesDropdown;
