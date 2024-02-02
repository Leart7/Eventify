import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useDragScroll from "../hooks/useDragScroll";
import { useSuggestedOrganizers } from "../reactQuery/useSuggestedOrganizers";
import { useUser } from "../reactQuery/useUser";
import OrganizerCard from "./OrganizerCard";

export default function OrganizersScroll() {
  const { user } = useUser();

  const {
    containerRef,
    contentRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDragScroll();

  const { suggestedOrganizers } = useSuggestedOrganizers({ user: user?.id });

  return (
    <section>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className=" mb-4 text-2xl font-bold text-[#1e0a3c]">
          <FontAwesomeIcon icon={faUser} className="mr-2 text-[32px]" />
          Organizers To Follow
        </div>

        <aside
          className="grid grid-flow-col justify-start gap-1 overflow-x-scroll pl-2"
          ref={contentRef}
        >
          {suggestedOrganizers?.map((organizer) => (
            <OrganizerCard
              key={organizer.followedUserId}
              organizer={organizer}
            />
          ))}
        </aside>
      </div>
    </section>
  );
}
