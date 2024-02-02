import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function TopDestinations() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const handleNext = () => {
    const screenWidth = window.innerWidth;
    let scrollAmount;

    if (screenWidth < 780) {
      scrollAmount = 363;
    } else if (screenWidth < 1135) {
      scrollAmount = 735;
    } else {
      scrollAmount = 1104;
    }

    const newPosition = contentRef.current.scrollLeft + scrollAmount;

    contentRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    const screenWidth = window.innerWidth;
    let scrollAmount;

    if (screenWidth < 780) {
      scrollAmount = 363;
    } else if (screenWidth < 1135) {
      scrollAmount = 735;
    } else {
      scrollAmount = 1104;
    }

    const newPosition = contentRef.current.scrollLeft - scrollAmount;

    contentRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };
  return (
    <section className="relative w-full overflow-hidden bg-[#f8f7fa] pb-[40px] pt-[80px]">
      <section
        className=" mx-4 px-2  lg:px-4 xl:mx-24 xl:px-8 "
        ref={containerRef}
      >
        <div className="flex justify-between pb-[45px] text-2xl font-bold text-[#1e0a3c]">
          <p>top destinations in kosova</p>{" "}
          <div className="z-40 grid grid-flow-col gap-8 text-[24px]">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="cursor-pointer"
              onClick={handlePrev}
            />
            <FontAwesomeIcon
              icon={faArrowRight}
              className="cursor-pointer"
              onClick={handleNext}
            />
          </div>{" "}
        </div>

        <div className="flex gap-8 overflow-x-scroll" ref={contentRef}>
          <aside>
            <div
              role="button"
              onClick={() => navigate(`/find-events/Pristina`)}
              className="group relative h-[180px] w-[280px] cursor-pointer overflow-hidden rounded-t-[40px] sm:h-[208px] sm:w-[336px]"
            >
              <img
                className="h-full w-full  transform-gpu transition-transform duration-300 group-hover:scale-110 "
                src="https://images.pexels.com/photos/16571762/pexels-photo-16571762/free-photo-of-drone-shot-of-prishtina.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <h1 className="absolute bottom-10 left-8 z-20 text-2xl font-bold text-[#f8f7fa] sm:text-[32px]">
                Prishtina
              </h1>
              <div className="absolute left-0 right-0 top-[172px] z-10 h-2 transform-gpu bg-[#f05537] transition-transform duration-300 placeholder:origin-top group-hover:scale-y-[9] sm:top-[200px] sm:group-hover:scale-y-[12] "></div>
            </div>
          </aside>
          <aside>
            <div
              role="button"
              onClick={() => navigate(`/find-events/Prizren`)}
              className="group relative h-[180px] w-[280px] cursor-pointer overflow-hidden rounded-t-[40px] sm:h-[208px] sm:w-[336px]"
            >
              <img
                className="h-full w-full  transform-gpu transition-transform duration-300 group-hover:scale-110 "
                src="/prizren.jpg"
                alt=""
              />
              <h1 className="absolute bottom-10 left-8 z-20 text-2xl font-bold text-[#f8f7fa] sm:text-[32px]">
                Prizren
              </h1>
              <div className="absolute left-0 right-0 top-[172px] z-10 h-2 transform-gpu bg-[#f05537] transition-transform duration-300 placeholder:origin-top group-hover:scale-y-[9] sm:top-[200px] sm:group-hover:scale-y-[12] "></div>
            </div>
          </aside>
          <aside>
            <div
              role="button"
              onClick={() => navigate(`/find-events/Gjakovë`)}
              className="group relative h-[180px] w-[280px] cursor-pointer overflow-hidden rounded-t-[40px] sm:h-[208px] sm:w-[336px]"
            >
              <img
                className="h-full w-full  transform-gpu transition-transform duration-300 group-hover:scale-110 "
                src="gjakova.jpg"
                alt=""
              />
              <h1 className="absolute bottom-10 left-8 z-20 text-2xl font-bold text-[#f8f7fa] sm:text-[32px]">
                Gjakova
              </h1>
              <div className="absolute left-0 right-0 top-[172px] z-10 h-2 transform-gpu bg-[#f05537] transition-transform duration-300 placeholder:origin-top group-hover:scale-y-[9] sm:top-[200px] sm:group-hover:scale-y-[12] "></div>
            </div>
          </aside>
          <aside>
            <div
              role="button"
              onClick={() => navigate(`/find-events/Ferizaj`)}
              className="group relative h-[180px] w-[280px] cursor-pointer overflow-hidden rounded-t-[40px] sm:h-[208px] sm:w-[336px]"
            >
              <img
                className="h-full w-full  transform-gpu transition-transform duration-300 group-hover:scale-110 "
                src="ferizaj.jpg"
                alt=""
              />
              <h1 className="absolute bottom-10 left-8 z-20 text-2xl font-bold text-[#f8f7fa] sm:text-[32px]">
                Ferizaj
              </h1>
              <div className="absolute left-0 right-0 top-[172px] z-10 h-2 transform-gpu bg-[#f05537] transition-transform duration-300 placeholder:origin-top group-hover:scale-y-[9] sm:top-[200px] sm:group-hover:scale-y-[12] "></div>
            </div>
          </aside>{" "}
          <aside>
            <div
              role="button"
              onClick={() => navigate(`/find-events/Mitrovicë`)}
              className="group relative h-[180px] w-[280px] cursor-pointer overflow-hidden rounded-t-[40px] sm:h-[208px] sm:w-[336px]"
            >
              <img
                className="h-full w-full  transform-gpu transition-transform duration-300 group-hover:scale-110 "
                src="mitrovica.jpg"
                alt=""
              />
              <h1 className="absolute bottom-10 left-8 z-20 text-2xl font-bold text-[#f8f7fa] sm:text-[32px]">
                Mitrovica
              </h1>
              <div className="absolute left-0 right-0 top-[172px] z-10 h-2 transform-gpu bg-[#f05537] transition-transform duration-300 placeholder:origin-top group-hover:scale-y-[9] sm:top-[200px] sm:group-hover:scale-y-[12] "></div>
            </div>
          </aside>
          <aside>
            <div
              role="button"
              onClick={() => navigate(`/find-events/Peć`)}
              className="group relative h-[180px] w-[280px] cursor-pointer overflow-hidden rounded-t-[40px] sm:h-[208px] sm:w-[336px]"
            >
              <img
                className="h-full w-full  transform-gpu transition-transform duration-300 group-hover:scale-110 "
                src="peja.jpg"
                alt=""
              />
              <h1 className="absolute bottom-10 left-8 z-20 text-2xl font-bold text-[#f8f7fa] sm:text-[32px]">
                Peja
              </h1>
              <div className="absolute left-0 right-0 top-[172px] z-10 h-2 transform-gpu bg-[#f05537] transition-transform duration-300 placeholder:origin-top group-hover:scale-y-[9] sm:top-[200px] sm:group-hover:scale-y-[12] "></div>
            </div>
          </aside>
          <aside>
            <div
              role="button"
              onClick={() => navigate(`/find-events/Gjilan`)}
              className="group relative h-[180px] w-[280px] cursor-pointer overflow-hidden rounded-t-[40px] sm:h-[208px] sm:w-[336px]"
            >
              <img
                className="h-full w-full  transform-gpu transition-transform duration-300 group-hover:scale-110 "
                src="gjilan.jpg"
                alt=""
              />
              <h1 className="absolute bottom-10 left-8 z-20 text-2xl font-bold text-[#f8f7fa] sm:text-[32px]">
                Gjilan
              </h1>
              <div className="absolute left-0 right-0 top-[172px] z-10 h-2 transform-gpu bg-[#f05537] transition-transform duration-300 placeholder:origin-top group-hover:scale-y-[9] sm:top-[200px] sm:group-hover:scale-y-[12] "></div>
            </div>
          </aside>
        </div>
      </section>
      <div
        className="absolute bottom-0 right-0  top-0 z-20 h-full w-2 bg-[#f8f7fa] xl:right-[5.5em]"
        style={{ boxShadow: " -0.9em 0px 4.5em 110px rgb(248, 247, 250)" }}
      ></div>
    </section>
  );
}
