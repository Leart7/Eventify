import { useQuery } from "@tanstack/react-query";
import { getTotalFollowers } from "../services/apiFollows";

export function useTotalFollowers(userId) {
  const {
    isLoading,
    data: totalFollowers,
    refetch,
  } = useQuery({
    queryKey: ["totalFollowers"],
    queryFn: () => getTotalFollowers(userId),
  });

  return { isLoading, totalFollowers, refetch };
}
