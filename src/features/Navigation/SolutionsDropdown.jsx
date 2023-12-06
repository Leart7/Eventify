import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { removeActiveDropdown } from "../../redux/activeDropdownSlice";

function SolutionsDropdown({ setIsCreateClicked }) {
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
          Solutions
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Event Ticketing
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Event Marketing Platform
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Eventify Ads
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Payments
        </li>
      </ul>
    </div>
  );
}

export default SolutionsDropdown;
