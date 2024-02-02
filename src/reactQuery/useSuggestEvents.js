import { useQuery } from "@tanstack/react-query";
import { suggestEvents } from "../services/apiEvents";

export function useSuggestEvents(userId, eventId) {
  const {
    isLoading,
    data: suggestedEvents,
    refetch,
  } = useQuery({
    queryKey: ["suggestedEvents"],
    queryFn: () => suggestEvents(userId, eventId),
  });

  return { isLoading, suggestedEvents, refetch };
}
