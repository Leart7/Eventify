import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../services/apiEvents";

export function useEvent(eventId) {
  const { isLoading, data: event } = useQuery({
    queryKey: ["event"],
    queryFn: () => getEvent(eventId),
  });

  return { isLoading, event };
}
