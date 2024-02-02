import { useDispatch } from "react-redux";
import { setActiveLocationFilter } from "../redux/activeLocationFilterSlice";
import { setAreaLocation } from "../redux/mapAreaSlice";
import { useSearchParams } from "react-router-dom";
import { setCity } from "../redux/searchModalCitySlice";

function CitiesList({ queryCities, from }) {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className={`absolute inset-0 top-10 z-50 w-96`}>
      <ul className=" flex flex-col rounded-md border bg-white py-2 text-sm font-normal shadow-md">
        {queryCities.slice(0, 5).map((city) => (
          <li
            onMouseDown={() => {
              dispatch(setActiveLocationFilter(`${city.name}`));
              dispatch(
                setAreaLocation([
                  city.location.latitude,
                  city.location.longitude,
                ]),
              );
              if (from !== "modal") {
                searchParams.set(
                  "city",
                  `${city.location.latitude}&${city.location.longitude}&${city.name}`,
                );
                setSearchParams(searchParams);
              } else {
                dispatch(
                  setCity([
                    city.location.latitude,
                    city.location.longitude,
                    city.name,
                  ]),
                );
              }
            }}
            key={city.name}
            role="button"
            onClick={(e) => e.stopPropagation()}
            className={` flex w-full items-center gap-x-4  px-7 py-4 hover:cursor-pointer hover:bg-stone-100`}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CitiesList;
