import { useMutation } from "@tanstack/react-query";
import { createClosedAccountReason as createClosedAccountReasonApi } from "../services/apiClosedAccountReasons";

export function useCreateClosedAccountReason() {
  const { isLoading, mutate: createClosedAccountReason } = useMutation({
    mutationFn: createClosedAccountReasonApi,
  });

  return { isLoading, createClosedAccountReason };
}
