import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../services/apiLanguages";

export function useLanguages() {
  const { isLoading, data: languages } = useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });

  return { isLoading, languages };
}
