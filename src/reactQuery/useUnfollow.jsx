import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollow as unfollowApi } from "../services/apiFollows";
import toast from "react-hot-toast";
import Toaster from "../ui/Toaster";

export function useUnfollow() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: unfollow } = useMutation({
    mutationFn: unfollowApi,
    onSuccess: (test) => {
      queryClient.invalidateQueries({ queryKey: ["followings"] });
      toast.custom((t) => (
        <Toaster
          t={t}
          text={`You unfollowed ${test.firstName} ${test.lastName}`}
          link="Followings"
        />
      ));
    },
  });

  return { isLoading, unfollow };
}
