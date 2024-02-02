import { useMutation } from "@tanstack/react-query";
import { updateUserPassword } from "../services/apiAuth";

export function useUpdateUserPassword() {
  const { isLoading, mutate: updatePassword } = useMutation({
    mutationFn: updateUserPassword,
  });

  return { isLoading, updatePassword };
}
