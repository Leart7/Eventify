import { useQuery } from "@tanstack/react-query";
import { getEventsByFollowings } from "../services/apiEvents";

export function useEventsFollowings(queryParams) {
  const { isLoading, data: eventsFollowings } = useQuery({
    queryKey: ["eventsFollowings", queryParams],
    queryFn: () => getEventsByFollowings(queryParams),
  });

  return { isLoading, eventsFollowings };
}
