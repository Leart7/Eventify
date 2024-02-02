import { useMutation } from "@tanstack/react-query";
import { checkEmail as checkEmailApi } from "../services/apiAuth";

export function useCheckEmail() {
  const { mutate: checkEmail } = useMutation({
    mutationFn: checkEmailApi,
  });

  return { checkEmail };
}
