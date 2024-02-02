import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";
import { jwtToken } from "../services/jwtToken";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,

    enabled: !!jwtToken,
  });

  return { isLoading, user };
}
