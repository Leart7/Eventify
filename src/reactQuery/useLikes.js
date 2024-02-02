import { useQuery } from "@tanstack/react-query";
import { getLikes } from "../services/apiLikes";
import { useUser } from "./useUser";

export function useLikes() {
  const { user } = useUser();

  const { isLoading, data: likes } = useQuery({
    queryKey: ["likes"],
    queryFn: getLikes,

    enabled: !!user,
  });

  return { isLoading, likes };
}
