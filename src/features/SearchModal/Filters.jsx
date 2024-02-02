import SearchModalFilter from "../../ui/SearchModalFilter";

function Filters() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <SearchModalFilter filterName={"Online"} filterOption={"Online"} />
      <SearchModalFilter filterName={"Date"} filterOption={"Today"} />
      <SearchModalFilter filterName={"Date"} filterOption={"This weekend"} />
      <SearchModalFilter filterName={"Price"} filterOption={"Free"} />
      <SearchModalFilter filterName={"Category"} filterOption={"Music"} />
      <SearchModalFilter
        filterName={"Category"}
        filterOption={"Food & Drink"}
      />
    </div>
  );
}

export default Filters;
