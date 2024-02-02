import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiAuth";

export function usePublicUser(userId) {
  const { isLoading, data: publicUser } = useQuery({
    queryKey: ["publicUser"],
    queryFn: () => getUser(userId),
  });

  return { isLoading, publicUser };
}
