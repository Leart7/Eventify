import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "../services/apiCurrencies";

export function useCurrencies() {
  const { isLoading, data: currencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  return { isLoading, currencies };
}
