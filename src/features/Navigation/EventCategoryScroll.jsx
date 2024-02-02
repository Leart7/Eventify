import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faStethoscope , faBasketball, faMasksTheater, faGift , faGamepad , faBriefcase , faBurger} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import  useDragScroll  from "../../hooks/useDragScroll"
export default function EventCategoryScroll() {
  const {
    containerRef,
    contentRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDragScroll();


  const categories = [
    {
      name: "Music",
      icon: faMusic, // Replace with the actual URL or reference for the icon
    },
    {
      name: "Sports",
      icon: faBasketball // Replace with the actual URL or reference for the icon
    },
    {
      name: "Arts",
      icon: faMasksTheater, // Replace with the actual URL or reference for the icon
    },
    {
      name: "Holidays",
      icon:faGift, // Replace with the actual URL or reference for the icon
    },
    {
      name: "Health",
      icon: faStethoscope, // Replace with the actual URL or reference for the icon
    },
    {
      name: "Hobbies",
      icon: faGamepad , // Replace with the actual URL or reference for the icon
    },
    {
      name: "Buisness",
      icon: faBriefcase, // Replace with the actual URL or reference for the icon
    },
    {
      name: "Food & Drink",
      icon: faBurger, // Replace with the actual URL or reference for the icon
    },
  ];
  return (
    <section className=" bg-[#f6f5f8] px-1 py-5 "  ref={containerRef}
   
    onMouseDown={handleMouseDown}
    onMouseLeave={handleMouseLeave}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
    >
        <div className="flex flex-wrap justify-evenly xs:justify-normal gap-[26px] xl:gap-14 gap-y-5 lg:ml-0 md:ml-12 xs:ml-4 xl:overflow-x-hidden overflow-x-scroll xs:flex-nowrap xl:justify-center xs:gap-14 lg:px-32 lg:py-9" ref={contentRef}>
      {categories.map((category, index) => (
        <div key={index} className="grid group items-center justify-center gap-2 sm:hover:text-[#3d64ff] hover:cursor-pointer sm:text-[#3a3247]">
             
        <div className="flex h-16 w-16 items-center sm:group-hover:bg-slate-300 justify-center rounded-full border-2 border-[#dfe5ff] bg-white text-[#627deb]  text-inherit sm:h-28 sm:w-28">
          <FontAwesomeIcon
            icon={category.icon}
            className="h-6 w-6 sm:h-10 sm:w-10"
          />
        </div>
        <p className="text-center text-xs text-inherit">{category.name}</p>
     
        </div>
      ))}
    </div>
   
    </section>
  );
}
