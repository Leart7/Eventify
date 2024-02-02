import { Link } from "react-router-dom";
import { useLogout } from "../../reactQuery/useLogout";

function UserAccountDropdown({ email }) {
  const { logout } = useLogout();

  return (
    <div className={`absolute -right-5 top-[3.3rem] z-50 w-60 text-sm`}>
      <ul className=" flex flex-col rounded-md bg-white shadow-sm">
        <Link
          to="/filter-events"
          role="button"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className=" w-full px-3 py-4 ps-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Browse events
        </Link>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Manage my events
        </li>
        <Link
          to="/tickets"
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Tickets
        </Link>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Credits
        </li>
        <Link
          to="/tickets"
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Liked
        </Link>
        <Link
          to="/tickets"
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Following
        </Link>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Interests
        </li>
        <li
          role="button"
          disabled
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 text-stone-400 hover:cursor-not-allowed hover:bg-stone-100"
        >
          {email}
        </li>
        <Link
          to="/account-settings"
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Account settings
        </Link>
        <li
          role="button"
          onClick={(e) => {
            logout();
            e.stopPropagation();
          }}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Log out
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Organize
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Help
        </li>
      </ul>
    </div>
  );
}

export default UserAccountDropdown;
