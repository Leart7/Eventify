import { useQuery } from "@tanstack/react-query";
import { getFormats } from "../services/apiFormats";

export function useFormats() {
  const { isLoading, data: formats } = useQuery({
    queryKey: ["formats"],
    queryFn: getFormats,
  });

  return { isLoading, formats };
}
