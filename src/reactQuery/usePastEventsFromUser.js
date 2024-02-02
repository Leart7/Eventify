import { useQuery } from "@tanstack/react-query";
import { getPastEventsFromUser } from "../services/apiEvents";

export function usePastEventsFromUser(userId) {
  const {
    isLoading,
    data: pastEvents,
    refetch,
  } = useQuery({
    queryKey: ["pastEvents"],
    queryFn: () => getPastEventsFromUser(userId),
  });

  return { isLoading, pastEvents, refetch };
}
