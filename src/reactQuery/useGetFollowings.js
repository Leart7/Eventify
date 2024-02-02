import { useQuery } from "@tanstack/react-query";
import { getFollowings } from "../services/apiFollows";
import { useUser } from "./useUser";

export function useGetFollowings() {
  const { user } = useUser();

  const { isLoading, data: followings } = useQuery({
    queryKey: ["followings"],
    queryFn: getFollowings,

    enabled: !!user,
  });

  return { isLoading, followings };
}
