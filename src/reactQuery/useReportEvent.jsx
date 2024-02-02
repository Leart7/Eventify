import { useMutation } from "@tanstack/react-query";
import { reportEvent as reportEventApi } from "../services/apiReports";
import toast from "react-hot-toast";
import Toaster from "../ui/Toaster";

export function useReportEvent() {
  const { isLoading, mutate: reportEvent } = useMutation({
    mutationFn: reportEventApi,
    onSuccess: () => {
      toast.custom((t) => (
        <Toaster t={t} text={`You successfully reported this event!`} />
      ));
    },
  });

  return { isLoading, reportEvent };
}
