import FilterCheckboxes from "../../ui/FilterCheckboxes";
import FiltersCategories from "../../ui/FiltersCategories";

function FiltersSidebar({ areOpenFilters }) {
  return (
    <div className="hidden w-[35%] md:block lg:w-[25%] xl:w-[28%]">
      <h2 className="text-xl font-bold" style={{ color: "#1e0a3c" }}>
        Filters
      </h2>
      <div className={`mt-5 flex flex-col gap-y-3`}>
        <FilterCheckboxes />
      </div>
      <FiltersCategories areOpenFilters={areOpenFilters} />
    </div>
  );
}

export default FiltersSidebar;
