import { useState } from "react";

function EventsAboutLinks() {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <div className="mx-auto mt-16 flex w-3/4 items-center gap-x-5 border-b pb-5 font-semibold lg:mt-72">
      <p
        role="button"
        onClick={() => setActiveLink(0)}
        className={`${
          activeLink === 0 &&
          "text-blue-600 underline underline-offset-[1.65rem]"
        }  hover:cursor-pointer`}
      >
        Events
      </p>
      <p
        role="button"
        onClick={() => setActiveLink(1)}
        className={`${
          activeLink === 1 &&
          "text-blue-600 underline underline-offset-[1.7rem] "
        } hover:cursor-pointer lg:hidden`}
      >
        About
      </p>
    </div>
  );
}

export default EventsAboutLinks;
