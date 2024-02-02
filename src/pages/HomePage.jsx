import Navbar from "../ui/Navbar";
import EventCategoryScroll from "../features/Navigation/EventCategoryScroll";
import { useEffect, useState } from "react";
import LocationDropdown from "../features/Navigation/LoactionDropdown";
import EventCard from "../ui/EventCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import OrganizersScroll from "../ui/OrganizersScroll";
import TopDestinations from "../ui/TopDestinations";
import CategoryNavList from "../ui/CategoryNavList";
import { useGeolocation } from "../hooks/useGeolocation";
import { setAreaLocation } from "../redux/mapAreaSlice";
import { useDispatch, useSelector } from "react-redux";
import { reverseGeocode } from "../hooks/useReverseGeocoding";
import { setUserCity } from "../redux/userCitySlice";
import { useEvents } from "../reactQuery/useEvents";
import NoEvents from "../ui/NoEvents";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { userCity } = useSelector((store) => store.userCity);
  const [currentPage, setCurrentPage] = useState(1);

  const { events } = useEvents({
    city: searchParams?.get("city")?.split("&")[2] || userCity,
    online: searchParams?.get("Online") !== null,
    dateFilter: searchParams?.get("Date"),
    free: searchParams?.get("Price") === "Free",
    category: searchParams?.get("Category"),
    pageNumber: currentPage,
  });

  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    setAllEvents([]);
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    setAllEvents([]);
  }, []);

  useEffect(() => {
    if (events && events.events) {
      setAllEvents((prevEvents) => [...prevEvents, ...events.events]);
    }
  }, [events]);

  const {
    isLoading,
    position: geolocationPosition,
    error,
    getPosition,
  } = useGeolocation();

  useEffect(function () {
    getPosition();
  }, []);

  useEffect(
    function () {
      if (geolocationPosition)
        reverseGeocode(geolocationPosition?.lat, geolocationPosition?.lng).then(
          (address) => {
            if (address && geolocationPosition) {
              dispatch(
                setAreaLocation([
                  geolocationPosition.lat,
                  geolocationPosition.lng,
                ]),
              );
              dispatch(setUserCity(address));
            } else {
              console.log("Reverse geocoding failed.");
            }
          },
        );
    },
    [geolocationPosition],
  );

  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <>
      <Navbar />
      <main className="h-screen">
        <section className=" ">
          <div className="relative mt-12 w-full">
            <img
              className="hidden sm:block"
              src="https://cdn.evbstatic.com/s3-build/fe/build/images/885cab8c762d17c70c11d259433e9145-1_tablet_1067x470.webp"
              alt=""
            />
            <img
              className="block sm:hidden"
              src="https://cdn.evbstatic.com/s3-build/fe/build/images/9751dd52cf8fb822f9f159382310d572-1_mobile_659x494.webp"
              alt=""
            />
            <button className="absolute bottom-5 ml-6  rounded-md bg-orange-600 py-[10px] pl-[14px] pr-3 text-xs font-semibold text-white md:ml-12 md:py-3 md:pl-[18px] md:pr-4 md:text-sm lg:ml-32">
              Find your next event
            </button>
          </div>
        </section>

        <EventCategoryScroll />

        <LocationDropdown />
        {/* <SearchLocation/> */}

        <CategoryNavList
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <aside className="px-6 lg:px-12 xl:px-32 ">
          <section className="grid  ">
            {selectedItem === 0 && (
              <div className="mb-4 text-2xl font-bold">Events in prishtina</div>
            )}
            {selectedItem === 1 && (
              <div className="mb-4 text-2xl font-bold">
                <FontAwesomeIcon icon={faTicket} /> Based on your views
              </div>
            )}

            {allEvents?.length > 0 ? (
              <div className="flex flex-wrap">
                {allEvents?.map((event) => (
                  <EventCard key={event.id} columnClass="" event={event} />
                ))}
              </div>
            ) : (
              <NoEvents />
            )}

            {currentPage < events?.totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="hover:bg-stone-5 mx-auto w-1/4 transform rounded-md border-2 border-gray-400 bg-stone-50 px-7 py-2 text-sm font-medium transition-all duration-150 hover:border-gray-500 hover:bg-gray-100"
              >
                See More
              </button>
            )}
          </section>
          <OrganizersScroll />
          <div className="py-[100px]"></div>{" "}
        </aside>
        <TopDestinations />
      </main>
    </>
  );
}

export default HomePage;
