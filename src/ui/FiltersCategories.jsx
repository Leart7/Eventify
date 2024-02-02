import React from "react";
import FiltersOptions from "../features/Filtering/FiltersOptions";
import { useCategories } from "../reactQuery/useCategories";
import { useCurrencies } from "../reactQuery/useCurrencies";
import { useFormats } from "../reactQuery/useFormats";
import { useLanguages } from "../reactQuery/useLanguages";

const transformResponse = (name, items) => ({
  name: name,
  options: items?.map((item) => item.name),
});

const dateFilters = {
  name: "Date",
  options: [
    "Today",
    "Tomorrow",
    "This weekend",
    "This week",
    "Next week",
    "This month",
    "Next month",
  ],
};

const priceFilters = {
  name: "Price",
  options: ["Free", "Paid"],
};

function FiltersCategories({ areOpenFilters }) {
  const { categories } = useCategories();
  const { formats } = useFormats();
  const { languages } = useLanguages();
  const { currencies } = useCurrencies();

  const transformedCategoriesResponse = transformResponse(
    "Category",
    categories,
  );
  const transformedFormatsResponse = transformResponse("Format", formats);
  const transformedLanguagesResponse = transformResponse("Language", languages);
  const transformedCurrenciesResponse = transformResponse(
    "Currency",
    currencies,
  );

  const combinedFilters = [
    dateFilters,
    priceFilters,
    transformedCategoriesResponse,
    transformedFormatsResponse,
    transformedLanguagesResponse,
    transformedCurrenciesResponse,
  ];

  return (
    <div className="mt-10 flex flex-col gap-y-2 pb-24 md:gap-y-8">
      {combinedFilters?.map((filter, i) => (
        <React.Fragment key={filter.name}>
          <div id={filter.name} className="h-10 w-full md:hidden"></div>
          <div className="flex flex-col gap-y-4  md:gap-y-3">
            <h3
              className="mb-2 font-semibold md:text-sm"
              style={{ color: "#1e0a3c" }}
            >
              {combinedFilters[i].name}
            </h3>
            <FiltersOptions
              filter={combinedFilters[i].name}
              options={combinedFilters[i].options}
              areOpenFilters={areOpenFilters}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default FiltersCategories;
