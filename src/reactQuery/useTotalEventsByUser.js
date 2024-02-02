import { useQuery } from "@tanstack/react-query";
import { getTotalEvents } from "../services/apiEvents";

export function useTotalEventsByUser(userId) {
  const { isLoading, data: totalEvents } = useQuery({
    queryKey: ["totalEvents"],
    queryFn: () => getTotalEvents(userId),
  });

  return { isLoading, totalEvents };
}
