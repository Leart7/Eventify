import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FiltersCategories from "../../ui/FiltersCategories";
import FilterCheckboxes from "../../ui/FilterCheckboxes";
import ActiveFilters from "../../ui/ActiveFilters";

function FiltersMobileModal({ areOpenFilters, setAreOpenFilters }) {
  const filtersSlice = useSelector((store) => store.filters.filters);
  const [filterNavHeight, setFilterNavHeight] = useState(47 + 5);

  const activeFilters = filtersSlice
    .map((f) => f.option)
    .filter((f) => f.length !== 0);

  useEffect(() => {
    const languageFilterDiv = document.getElementById(areOpenFilters[1]);

    if (languageFilterDiv) {
      languageFilterDiv.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [areOpenFilters]);

  useEffect(
    function () {
      const element = document.getElementById("fixedFilterNav");
      setFilterNavHeight(element.clientHeight + 5);
    },
    [activeFilters],
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setAreOpenFilters(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setAreOpenFilters]);

  useEffect(function () {
    const closeFilterModal = (e) => {
      if (e.key === "Escape") {
        setAreOpenFilters(false);
      }
    };

    document.addEventListener("keydown", closeFilterModal);

    return () => {
      document.removeEventListener("keydown", closeFilterModal);
    };
  });

  return (
    <div className="animateOpenModal fixed bottom-0 left-0 right-0 top-0 z-[5000000] h-screen w-full overflow-y-auto bg-white px-3 pt-2 lg:-translate-x-0 lg:-translate-y-0 lg:transform">
      <div
        id="fixedFilterNav"
        className={`fixed left-0 right-0 top-0 flex flex-col gap-y-3 bg-white px-3`}
      >
        <div className="flex items-center justify-between ">
          <h2 className="mt-2 text-xl font-bold" style={{ color: "#1e0a3c" }}>
            Filters
          </h2>
          <div
            role="button"
            onClick={() => setAreOpenFilters(false)}
            className="mt-2 flex h-[39px] w-[39px] items-center justify-center rounded-full pt-1 text-center hover:cursor-pointer hover:bg-stone-100"
          >
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
        <ActiveFilters areOpenFilters={areOpenFilters} />
      </div>

      <div
        style={{ marginTop: `${filterNavHeight}px` }}
        className={`flex flex-col gap-y-4`}
      >
        <FilterCheckboxes />
      </div>

      <FiltersCategories areOpenFilters={areOpenFilters} />

      <div className="fixed bottom-0 left-0 right-0 bg-white px-3  pb-4">
        <button
          onClick={() => setAreOpenFilters(false)}
          className="mt-3 w-full rounded-md bg-orange-600 py-2 font-medium text-white hover:bg-orange-500"
        >
          View event results
        </button>
      </div>
    </div>
  );
}

export default FiltersMobileModal;
