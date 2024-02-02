import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Slide from "../../ui/Slide";

const views = [
  {
    id: 0,
    content: (
      <Slide
        img="/firstSlideImage.jpg"
        title="The best virtual events you can attend from home"
        upcomingNumber={48}
        description="Don’t feel like leaving the house? You can still attend a comedy workshop, join a yoga class, or discuss a recent page-turner with a book club — virtually, of course. Eventbrite’s experts have curated the best online events and..."
      />
    ),
  },
  {
    id: 1,
    content: (
      <Slide
        img="/secondSlideImage.jpg"
        title="In the kitchen: virtual food & drink events & classes"
        upcomingNumber={55}
        description="Skip the takeout and spend some time in your own kitchen with the help of online cooking and mixology classes, tastings, and talks for every taste. Eventbrite’s experts have gathered virtual events..."
      />
    ),
  },
  {
    id: 2,
    content: (
      <Slide
        img="/thirdSlideImage.jpg"
        title="Black excellence: events that celebrate black culture"
        upcomingNumber={37}
        description="It’s easy to find examples of Black excellence — just look to some of your favorite films, music, food, comedians, and books. Eventbrite’s experts have tracked down virtual events that celebrate the best..."
      />
    ),
  },
  {
    id: 3,
    content: (
      <Slide
        img="/fourthSlideImage.jpg"
        title="Educate yourself: online racial equity workshops"
        upcomingNumber={25}
        description="Don’t feel like leaving the house? You can still attend a comedy workshop, join a yoga class, or discuss a recent page-turner with a book club — virtually, of course. Eventbrite’s experts have curated the best online events and..."
      />
    ),
  },
  {
    id: 4,
    content: (
      <Slide
        img="/fifthSlideImage.jpg"
        title="Self-care: virtual wellness, yoga & fitness events"
        upcomingNumber={113}
        description="Relax, recuperate, or break a sweat with this Collection of online wellness events that focus on mental and physical health. Eventbrite’s experts have found soothing guided meditations, stress..."
      />
    ),
  },
];

function Slider() {
  const [currentView, setCurrentView] = useState(0);
  const [lastArrowClicked, setLastArrowClicked] = useState(null);

  const goToNextView = () => {
    if (currentView < views.length - 1) {
      setCurrentView(currentView + 1);
    }
  };

  const goToPrevView = () => {
    if (currentView > 0) {
      setCurrentView(currentView - 1);
    }
  };

  useEffect(
    function () {
      if (currentView === 0 || currentView === views.length - 1) {
        setLastArrowClicked(null);
      }
    },
    [currentView],
  );

  return (
    <div className="md:w-[46%] lg:w-full">
      <div className="mb-3 flex items-center justify-between">
        <h2
          style={{ color: "#1e0a3c" }}
          className="mt-5 text-lg font-bold md:mt-10  lg:text-2xl"
        >
          Our favorite online event collections
        </h2>
        <div className="flex items-center gap-x-2 md:mt-5">
          <div
            role="button"
            onClick={() => {
              goToPrevView();
              setLastArrowClicked("left");
            }}
            className={`${lastArrowClicked === "left" ? "bg-stone-100" : ""} ${
              currentView === 0
                ? "text-gray-400 hover:cursor-default hover:bg-white"
                : ""
            } mt-5 h-[39px] w-[39px] items-center justify-center rounded-full pt-1 text-center hover:cursor-pointer hover:bg-stone-100 lg:flex`}
          >
            <FontAwesomeIcon icon={faArrowLeft} className={`pt-2 lg:pt-0 `} />
          </div>
          <div
            role="button"
            onClick={() => {
              goToNextView();
              setLastArrowClicked("right");
            }}
            className={`${lastArrowClicked === "right" ? "bg-stone-100" : ""} ${
              currentView === views.length - 1
                ? "text-gray-400 hover:cursor-default hover:bg-white"
                : ""
            } mt-5 h-[39px] w-[39px] items-center justify-center rounded-full pt-1 text-center hover:cursor-pointer hover:bg-stone-100 lg:flex`}
          >
            <FontAwesomeIcon icon={faArrowRight} className={`pt-2 lg:pt-0 `} />
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-hidden">
        <div
          className="slider-content flex"
          style={{ transform: `translateX(-${currentView * 100}%)` }}
        >
          {views.map((view) => (
            <div key={view.id} className="w-full flex-shrink-0">
              {view.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
