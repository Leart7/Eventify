import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeEvent } from "../services/apiLikes";
import toast from "react-hot-toast";
import Toaster from "../ui/Toaster";
import { useUser } from "./useUser";
import { useDispatch } from "react-redux";

export function useLikeEvent() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { isLoading, mutate: like } = useMutation({
    mutationFn: likeEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
      toast.custom((t) => (
        <Toaster t={t} text={`Event added to Likes`} link="Likes" />
      ));
    },
    onError: () => {
      toast.custom((t) => (
        <Toaster t={t} text={`You already liked this event!`} link="Likes" />
      ));
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (user) {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    }
  }, [user, queryClient]);

  return { isLoading, like };
}
