import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { isLoading, updateUser };
}
