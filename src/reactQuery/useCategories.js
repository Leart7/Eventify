import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/apiCategories";

export function useCategories() {
  const { isLoading, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { isLoading, categories };
}
