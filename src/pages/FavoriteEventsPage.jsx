import { useLikes } from "../reactQuery/useLikes";
import LikedEvent from "../ui/LikedEvent";
import Navbar from "../ui/Navbar";

function FavoriteEventsPage() {
  const { likes } = useLikes();

  return (
    <>
      <Navbar />
      <div className="mx-auto w-[90%] md:w-[70%] lg:mt-52 2xl:w-1/2">
        <h1
          className="mb-5 text-3xl font-bold lg:text-5xl"
          style={{ color: "#1e0a3c" }}
        >
          Likes
        </h1>
        <div className="flex flex-col gap-y-2">
          {likes?.map((likedEvent) => (
            <LikedEvent
              key={likedEvent.id}
              event={likedEvent.event}
              like={likedEvent.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default FavoriteEventsPage;
