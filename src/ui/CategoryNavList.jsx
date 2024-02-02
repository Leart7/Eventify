import { useSearchParams } from "react-router-dom";
import useDragScroll from "../hooks/useDragScroll";
import { useEffect } from "react";
export default function CategoryNavList({ selectedItem, setSelectedItem }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const {
    containerRef,
    contentRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDragScroll();

  useEffect(
    function () {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.delete("Online");
      newSearchParams.delete("Date");
      newSearchParams.delete("Price");
      newSearchParams.delete("Category");

      switch (selectedItem) {
        case 2:
          newSearchParams.set("Online", "Online");
          break;
        case 3:
          newSearchParams.set("Date", "Today");
          break;
        case 4:
          newSearchParams.set("Date", "This-weekend");
          break;
        case 5:
          newSearchParams.set("Price", "Free");
          break;
        case 6:
          newSearchParams.set("Category", "Music");
          break;
        case 7:
          newSearchParams.set(
            `Category`,
            "Food & Drink"
              .replaceAll("&", "and")
              .replaceAll(",", "")
              .split(" ")
              .join("-"),
          );
          break;
        case 8:
          newSearchParams.set(
            `Category`,
            "Charity & Causes"
              .replaceAll("&", "and")
              .replaceAll(",", "")
              .split(" ")
              .join("-"),
          );
          break;
        default:
          console.error("Filter not known");
      }

      setSearchParams(newSearchParams);
    },
    [searchParams, selectedItem, setSearchParams],
  );

  return (
    <section
      className="overflow-x-auto px-6 lg:px-12 xl:px-32"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <ul
        className="ml-3 mt-5 flex h-14 justify-start pb-5 text-sm font-semibold text-[#6f7287] "
        ref={contentRef}
      >
        {[
          "All",
          "For You",
          "Online",
          "Today",
          "This WeekEnd",
          "Free",
          "Music",
          "Food & Drink",
          "Charity & Causes",
        ].map((item, index) => (
          <li
            key={index}
            className={`mt-3 cursor-pointer whitespace-nowrap px-4 ${
              selectedItem === index
                ? "border-b-2 border-b-blue-700 text-blue-500"
                : "hover:border-b-2 hover:border-b-black hover:text-black"
            }`}
            onClick={() => handleItemClick(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
