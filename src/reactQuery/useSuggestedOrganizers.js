import { useQuery } from "@tanstack/react-query";
import { getSuggestedOrganizers } from "../services/apiFollows";

export function useSuggestedOrganizers(user) {
  const { isLoading, data: suggestedOrganizers } = useQuery({
    queryKey: ["suggestedOrganizers", user],
    queryFn: getSuggestedOrganizers,
  });

  return { isLoading, suggestedOrganizers };
}
