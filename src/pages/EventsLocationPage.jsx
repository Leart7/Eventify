import Navbar from "../ui/Navbar";
import SearchFilterAndImg from "../ui/SearchFilterAndImg";
import EventTimeOptions from "../ui/EventTimeOptions";
import TrendingSearches from "../ui/TrendingSearches";
import EventCard from "../ui/EventCard";
import Footer from "../ui/Footer";
import OrganizersScroll from "../ui/OrganizersScroll";

function EventsLocationPage() {
  return (
    <div>
      {/* <Navbar /> */}
      <SearchFilterAndImg />
      <>
        <h2 className="' ml-28 pt-14 text-2xl font-bold text-[#4b4d63]">
          Online Events
        </h2>
        <div className="m-auto flex w-[87%] flex-wrap  ">
          <EventCard columnClass="" />
          <EventCard columnClass="" />
          <EventCard columnClass="" />
          <EventCard columnClass="" />
          <EventCard columnClass="" />
        </div>
      </>
      <TrendingSearches />
      <div className="m-auto w-[87%] pt-14">
        <OrganizersScroll />
      </div>

      <EventTimeOptions />
    </div>
  );
}

export default EventsLocationPage;
