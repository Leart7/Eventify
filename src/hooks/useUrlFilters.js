import { useSearchParams } from "react-router-dom";

export function useUrlFilters() {
  const [searchParams] = useSearchParams();

  const date = searchParams.get("Date");
  const category = searchParams.get("Category");
  const format = searchParams.get("Format");
  const price = searchParams.get("Price");
  const language = searchParams.get("Language");
  const currency = searchParams.get("Currency");
  const online = searchParams.get("Online");
  const search = searchParams.get("Search");

  const urlObj = [
    {
      filterName: "Date",
      option: date,
    },
    {
      filterName: "Category",
      option: category,
    },
    {
      filterName: "Format",
      option: format,
    },
    {
      filterName: "Price",
      option: price,
    },
    {
      filterName: "Language",
      option: language,
    },
    {
      filterName: "Currency",
      option: currency,
    },
    {
      filterName: "Online",
      option: online,
    },
    {
      filterName: "Search",
      option: search,
    },
  ];

  return { urlObj };
}
