function HelpCenterDropdown({ from }) {
  return (
    <div
      className={`absolute inset-0 top-10 z-50 w-60  ${
        from === "hamburger" ? "top-[3.2rem]" : ""
      }`}
    >
      <ul className=" flex flex-col rounded-md bg-white text-sm font-normal shadow-sm">
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Help Center
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Find your tickets
        </li>
        <li
          role="button"
          onClick={(e) => e.stopPropagation()}
          className=" w-full px-3 py-4 hover:cursor-pointer hover:bg-stone-100"
        >
          Contact your event organizer
        </li>
      </ul>
    </div>
  );
}

export default HelpCenterDropdown;
