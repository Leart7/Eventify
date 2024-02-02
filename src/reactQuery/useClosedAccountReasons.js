import { useQuery } from "@tanstack/react-query";
import { getClosedAccountReasons } from "../services/apiClosedAccountReasons";

export function useClosedAccountReasons() {
  const { isLoading, data: closedAccountReasons } = useQuery({
    queryKey: ["closedAccountReasons"],
    queryFn: getClosedAccountReasons,
  });

  return { isLoading, closedAccountReasons };
}
