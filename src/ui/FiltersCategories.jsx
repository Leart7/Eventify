import { filters } from "../data/filters";
import FiltersOptions from "../features/Filtering/FiltersOptions";

function FiltersCategories({ areOpenFilters }) {
  return (
    <div className="mt-10 flex flex-col gap-y-14 pb-24 md:gap-y-8">
      {filters.map((filter, i) => (
        <div
          id={filter.name}
          key={filter.name}
          className="flex flex-col gap-y-4 md:gap-y-3"
        >
          <h3
            className="mb-2 font-semibold md:text-sm"
            style={{ color: "#1e0a3c" }}
          >
            {filters[i].name}
          </h3>
          <FiltersOptions
            filter={filters[i].name}
            options={filters[i].options}
            areOpenFilters={areOpenFilters}
          />
        </div>
      ))}
    </div>
  );
}

export default FiltersCategories;
