// LocationDropdown.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SearchLocation from "../Filtering/SearchLocation";
import { useEffect,  useState } from "react";
function LocationDropdown() {
  const [isScreenWidthGreaterThan740, setIsScreenWidthGreaterThan740] = useState(
    window.innerWidth > 640
  );

  useEffect(() => {
    const handleResize = () => {
      setIsScreenWidthGreaterThan740(window.innerWidth > 640);
    };

    // Attach the event listener when the component mounts
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="px-6 lg:px-12 xl:px-32 ">
      <div className="mt-5 flex h-20  flex-col items-start gap-3 px-4 text-2xl sm:m-0 sm:flex-row sm:items-center md:text-3xl">
        <div className="flex items-center gap-3">
          <div className="font-bold text-sky-600 ">Popular in</div>

          {isScreenWidthGreaterThan740 ? (
            <FontAwesomeIcon icon={faArrowRight} className="text-sky-600" />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} className="text-sky-600" />
          )}
        </div>

        <SearchLocation showSearchInput={false} />
      </div>
    </section>
  );
}

export default LocationDropdown;
