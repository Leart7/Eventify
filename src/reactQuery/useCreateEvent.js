import { useMutation } from "@tanstack/react-query";
import { createEvent as createEventApi } from "../services/apiEvents";

export function useCreateEvent() {
  const { isLoading, mutate: createEvent } = useMutation({
    mutationFn: createEventApi,
    onSuccess: () => {
      console.log("Added");
    },
    onError: () => {
      console.log("Error");
    },
  });

  return { isLoading, createEvent };
}
