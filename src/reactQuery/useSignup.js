import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../services/apiAuth";

export function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signUpApi,
  });

  return { isLoading, signup };
}
