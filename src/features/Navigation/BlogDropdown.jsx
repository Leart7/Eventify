import { useDispatch } from "react-redux";
import { removeActiveDropdown } from "../../redux/activeDropdownSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function BlogDropdown({ setIsCreateClicked }) {
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
          Blog
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Tips & Guides
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          News & Trends
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Community
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Tools & Feautures
        </li>
      </ul>
    </div>
  );
}

export default BlogDropdown;
