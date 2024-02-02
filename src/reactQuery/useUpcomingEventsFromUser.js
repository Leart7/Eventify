import { useQuery } from "@tanstack/react-query";
import { getUpcomingEventsFromUser } from "../services/apiEvents";

export function useUpcomingEventsFromUser(userId) {
  const { isLoading, data: upcomingEvents } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: () => getUpcomingEventsFromUser(userId),
  });

  return { isLoading, upcomingEvents };
}
