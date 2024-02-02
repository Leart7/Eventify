import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

export default function NoEvents() {
  return (
    <div className="grid h-[45vh] w-full  place-content-center ">
      <div className="grid max-h-min w-full place-items-center gap-2 text-neutral-600">
        <FontAwesomeIcon icon={faCalendarDays} className="mb-6 text-[50px]" />
        <div className="text-2xl font-bold">No events in your area</div>
        <div className="text-sm">Try a different location</div>
      </div>
    </div>
  );
}
