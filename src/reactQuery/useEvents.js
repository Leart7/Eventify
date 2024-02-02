import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvents } from "../services/apiEvents";

export function useEvents(queryParams) {
  const queryClient = useQueryClient();

  const { isLoading, data: events } = useQuery({
    queryKey: ["events", queryParams],
    queryFn: () => getEvents(queryParams),
  });

  if (+queryParams.pageNumber < events?.totalPages) {
    queryClient.prefetchQuery({
      queryKey: [
        "events",
        { ...queryParams, pageNumber: +queryParams.pageNumber + 1 },
      ],
      queryFn: () =>
        getEvents({ ...queryParams, pageNumber: +queryParams.pageNumber + 1 }),
    });
  }

  if (+queryParams.pageNumber > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        "events",
        { ...queryParams, pageNumber: +queryParams.pageNumber - 1 },
      ],
      queryFn: () =>
        getEvents({ ...queryParams, pageNumber: +queryParams.pageNumber - 1 }),
    });
  }

  return { isLoading, events };
}
