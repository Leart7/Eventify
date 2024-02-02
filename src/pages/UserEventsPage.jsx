import EventsAboutLinks from "../features/UserEvents/EventsAboutLinks";
import UserEvents from "../features/UserEvents/UserEvents";
import UserIntro from "../features/UserEvents/UserIntro";
import Navbar from "../ui/Navbar";

function UserEventsPage() {
  return (
    <>
      <Navbar />
      <UserIntro />
      <EventsAboutLinks />
      <UserEvents />
    </>
  );
}

export default UserEventsPage;
