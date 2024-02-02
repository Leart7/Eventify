import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dislikeEvent } from "../services/apiLikes";
import toast from "react-hot-toast";
import Toaster from "../ui/Toaster";
import { useUser } from "./useUser";

export function useDislikeEvent() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { isLoading, mutate: dislike } = useMutation({
    mutationFn: dislikeEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
      toast.custom((t) => (
        <Toaster t={t} text={`Event removed from Likes`} link="Likes" />
      ));
    },
    enabled: !!user,
  });

  return { isLoading, dislike };
}
