import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeAccount as closeAccountApi } from "../services/apiClosedAccount";
import { useNavigate } from "react-router-dom";

export function useCloseAccount() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: closeAccount } = useMutation({
    mutationFn: closeAccountApi,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });

  return { isLoading, closeAccount };
}
