import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followOrganizer } from "../services/apiFollows";
import toast from "react-hot-toast";
import Toaster from "../ui/Toaster";
import { useUser } from "./useUser";
import { useEffect } from "react";

export function useFollowOrganizer() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { isLoading, mutate: follow } = useMutation({
    mutationFn: followOrganizer,
    onSuccess: (test) => {
      // queryClient.invalidateQueries({ queryKey: ["suggestedOrganizers"] });
      queryClient.invalidateQueries({ queryKey: ["followings"] });
      toast.custom((t) => (
        <Toaster
          t={t}
          text={`You followed ${test.firstName} ${test.lastName}`}
          link="Followings"
        />
      ));
    },
    onError: () => {
      toast.custom((t) => (
        <Toaster
          t={t}
          text={`You already follow this organizer!`}
          link="Followings"
        />
      ));
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (user) {
      queryClient.invalidateQueries(["suggestedOrganizers", "followings"]);
    }
  }, [user, queryClient]);

  return { isLoading, follow };
}
