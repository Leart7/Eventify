import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserEmail as updateUserEmailApi } from "../services/apiAuth";

export function useUpdateUserEmail() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateUserEmail } = useMutation({
    mutationFn: updateUserEmailApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { isLoading, updateUserEmail };
}
