import { useQuery } from "@tanstack/react-query";
import { getReportReasons } from "../services/apiReportEventReasons";

export function useReportEventReasons() {
  const { isLoading, data: reportReasons } = useQuery({
    queryKey: ["reportReasons"],
    queryFn: getReportReasons,
  });

  return { isLoading, reportReasons };
}
