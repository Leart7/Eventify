import useDragScroll from "../hooks/useDragScroll";
export default function CategoryNavList({selectedItem ,setSelectedItem}) {
  
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
  
    return (
      <section
        className="xl:px-32 lg:px-12 px-6 overflow-x-auto"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <ul
          className="flex justify-start pb-5 h-14 ml-3 mt-5 text-sm font-semibold text-[#6f7287] "
          ref={contentRef}
        >
          {["All", "For You", "Online", "Today", "This WeekEnd", "Free", "Music", "Food & Drink", "Charity & Causes"].map((item, index) => (
            <li
              key={index}
              className={`px-4 cursor-pointer whitespace-nowrap mt-3 ${selectedItem === index ? 'border-b-2 border-b-blue-700 text-blue-500' : 'hover:border-b-2 hover:text-black hover:border-b-black'}`}
              onClick={() => handleItemClick(index)}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    );
  }
  