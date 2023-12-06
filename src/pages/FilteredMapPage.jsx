import { useState } from "react";
import Filters from "../features/Filtering/Filters";
import Map from "../features/Filtering/Map";
import SearchLocation from "../features/Filtering/SearchLocation";
import Navbar from "../ui/Navbar";

function FilteredMapPage() {
  const [state, setState] = useState([]);

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col xl:w-[70%] 2xl:w-[60%]">
        <SearchLocation />
        <Filters state={state} setState={setState} />
      </div>
      <Map state={state} setState={setState} />
    </>
  );
}

export default FilteredMapPage;
