import { useState } from "react";
import CloseSearchModal from "./CloseSearchModal";
import Filters from "./Filters";
import RecentAndPopularSearches from "./RecentAndPopularSearches";
import SearchLocationModal from "./SearchLocationModal";
import Slider from "./Slider";

function SearchModalLayout({ setClickedModal }) {
  const [locationFocused, setLocationFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="px-3 ">
      <CloseSearchModal setClickedModal={setClickedModal} />
      <div className="flex w-full justify-between lg:mt-20 lg:justify-evenly ">
        <div className="lg:w-[40%]">
          <SearchLocationModal
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setLocationFocused={setLocationFocused}
          />
          {!locationFocused && searchQuery.length === 0 && <Filters />}
          <div className="hidden lg:block">
            {!locationFocused && searchQuery.length === 0 && (
              <RecentAndPopularSearches />
            )}
          </div>
        </div>
        <div className="hidden w-[40%] max-w-lg lg:block ">
          {searchQuery.length === 0 && <Slider />}
        </div>
      </div>

      <div className="justify-between md:flex lg:hidden">
        {!locationFocused && searchQuery.length === 0 && (
          <>
            <RecentAndPopularSearches />
            <Slider />
          </>
        )}
      </div>
    </div>
  );
}

export default SearchModalLayout;
