import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useLikeEvent } from "./useLikeEvent";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { like } = useLikeEvent();

  const { isLoading, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      localStorage.setItem("JwtToken", user.jwtToken);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.setQueryData(["suggestedOrganizers"], {
        user: user.id,
      });

      // if (localStorage.getItem("likedEvent")) {
      //   const event = JSON.parse(localStorage.getItem("likedEvent"));

      //   like({ eventId: event.id });

      //   queryClient.invalidateQueries({
      //     queryKey: ["likes"],
      //   });

      //   localStorage.removeItem("likedEvent");
      // }

      queryClient.invalidateQueries({ queryKey: ["suggestedOrganizers"] });
      queryClient.setQueryData(["user"], {
        id: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      });
      navigate("/", { replace: true });
    },
  });

  return { isLoading, login };
}
