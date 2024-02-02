import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faFire,
  faFilm,
  faClock,
  faLocationDot,
  faTicketSimple,
  faChevronDown,
  faFlag,
  faUser,
  faHeart,
  faCircleExclamation,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Navbar from "../ui/Navbar";
import { useEvent } from "../reactQuery/useEvent";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  extractTimeFromDate,
  formatDate,
  getTimeDifference,
} from "../utils/helpers";
import EventMapLocation from "../ui/EventMapLocation";
import { reverseGeocodeFullAddress } from "../hooks/useReverseGeocodingFullAddress";
import { useSuggestEvents } from "../reactQuery/useSuggestEvents";
import { useGetFollowings } from "../reactQuery/useGetFollowings";
import { useUnfollow } from "../reactQuery/useUnfollow";
import { useFollowOrganizer } from "../reactQuery/useFollowOrganizer";
import LikedEvent from "../ui/LikedEvent";
import { useTotalFollowers } from "../reactQuery/useTotalFollowers";
import { useQueryClient } from "@tanstack/react-query";
import { useModalCloser } from "../hooks/useModalCloser";
import Overlay from "../ui/Overlay";
import ReportModal from "../ui/ReportModal";

function EventDetails() {
  const { eventId } = useParams();
  const queryClient = useQueryClient();
  const [clickedModal, setClickedModal] = useModalCloser();
  const navigate = useNavigate();

  const { event } = useEvent(eventId);
  const { suggestedEvents, refetch } = useSuggestEvents(event?.userId, eventId);
  const [eventAddress, setEventAddress] = useState("");
  const { followings } = useGetFollowings();
  const { unfollow } = useUnfollow();
  const { follow } = useFollowOrganizer();
  const { totalFollowers, refetch: refetchFollowers } = useTotalFollowers(
    event?.userId,
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [activeEventAgend, setActiveEventAgend] = useState(
    event?.eventAgends[0] || null,
  );

  useEffect(
    function () {
      if (event) {
        setActiveEventAgend(event?.eventAgends[0]);
      }
    },
    [event],
  );

  const alreadyFollowedUser = followings?.find(
    (user) => user.followedUserId === event?.userId,
  );

  const timeDifference = getTimeDifference(
    new Date(),
    new Date(event?.startTime),
  );
  const hasEventEnded = timeDifference[0] === "-";

  const handleIconClick = () => {
    setIsTextVisible(!isTextVisible); // Toggle the visibility
  };

  const imgSlides = event?.imageUrls
    ? event.imageUrls.map((image) => ({ src: image }))
    : [];

  // const innerDivWidth = `${Math.min(100 / Math.min(imgSlides.length, 8), 100)}%`
  // console.log(innerDivWidth)
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imgSlides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === imgSlides.length - 1;

    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const [scrollPos, setScrollPos] = useState(0);
  //525
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(
    function () {
      async function getAddress() {
        const address = await reverseGeocodeFullAddress(
          event?.latitude,
          event?.longitude,
        );
        setEventAddress(address);
      }
      getAddress();
    },
    [event?.latitude, event?.longitude],
  );

  useEffect(
    function () {
      if (event) {
        refetch();
        refetchFollowers();
      }
    },
    [event, refetch, refetchFollowers],
  );

  const scrollerRef = useRef();
  const contentRef = useRef();
  const bottomRef = useRef();
  let margin = 0;
  const windowWidth = window.innerWidth;
  const [gg, setgg] = useState(0);

  if (windowWidth > 960) {
    if (scrollPos > 525 && scrollPos < 2024) {
      margin = scrollPos - 505;
    } else {
      margin = scrollPos < 525 ? 0 : 1519;
    }
  }

  const divStyle = {
    marginTop: margin + "px",
  };

  return (
    <>
      <Navbar />
      <div className="relative">
        <section className="w-full bg-cover bg-center lg:pt-8 xl:bg-[url('https://images.pexels.com/photos/7794362/pexels-photo-7794362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] ">
          <div
            className="relative mx-auto my-0 box-border h-[49vw] max-w-[1200px] overflow-hidden rounded-b-3xl bg-cover bg-center bg-no-repeat lg:max-h-[470px]   xl:rounded-3xl "
            style={{ backgroundImage: `url(${imgSlides[0]?.src})` }}
          >
            <div className="absolute inset-0 rounded-b-3xl backdrop-blur-lg xl:rounded-3xl"></div>
            <div
              className="relative z-20 mx-auto h-full w-full bg-cover bg-center lg:w-[940px]"
              style={{
                backgroundImage: `url(${imgSlides[currentIndex]?.src})`,
              }}
            >
              <div className="absolute bottom-2 z-30 flex h-5 w-full items-center gap-3 ">
                {imgSlides?.map((img, index) => (
                  <div
                    className={`h-2 w-full ${
                      index === currentIndex ? "bg-white" : "bg-gray-500"
                    }`}
                    key={index}
                    onClick={() => goToSlide(index)}
                  ></div>
                ))}
              </div>
            </div>
            <div
              className="absolute right-[4vw] top-[22vw] z-20 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-white md:flex lg:right-[41px] lg:top-[211px] "
              onClick={goToNext}
            >
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xl text-blue-800"
              />
            </div>{" "}
            <div
              className="absolute left-[4vw] top-[22vw] z-20 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-white md:flex lg:left-[41px] lg:top-[211px]"
              onClick={goToPrevious}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-xl text-blue-800"
              />
            </div>
          </div>
        </section>
        <section className="mx-auto flex w-full max-w-[720px] bg-slate-100 pt-12 lg:max-w-[1200px]">
          <div className="w-full overflow-y-auto pb-[64px] lg:w-[65%] ">
            <section className=" px-[24px] sm:px-[64px]  lg:px-[24px]">
              {" "}
              <div className="mb-1 w-full text-[16px] font-semibold  md:text-lg">
                <p>{formatDate(event?.startTime)}</p>
              </div>
              <div className="mb-8  text-[32px] font-extrabold lg:text-[52px]">
                <h1>{event?.title}</h1>
              </div>
              <div className="mb-8 w-full text-[16px] font-semibold lg:text-sm ">
                <p>{event?.description}</p>
              </div>
              <div className="mb-12 grid w-full items-center gap-2 rounded-md bg-[#f8f7fa] p-4 md:flex md:gap-0">
                <div className="flex w-full gap-3 md:w-[50%] ">
                  <img
                    className="aspect-square h-[78px] rounded-full bg-slate-300 md:h-[54px] md:w-[54px]"
                    src={event?.user.imageUrl}
                  />

                  <div className="grid w-full">
                    <p>
                      By{" "}
                      <strong>
                        {event?.user?.firstName} {event?.user?.lastName}
                      </strong>
                    </p>
                    <div>{totalFollowers} Followers</div>
                  </div>
                </div>

                <div className="flex w-full justify-end md:w-[50%] ">
                  {!alreadyFollowedUser ? (
                    <button
                      onClick={() =>
                        follow(
                          { followedUserId: event?.userId },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: ["totalFollowers"],
                              });
                            },
                          },
                        )
                      }
                      className="h-[38px] w-full cursor-pointer self-end rounded-md bg-indigo-700 text-sm font-medium text-white hover:bg-indigo-800 md:w-min md:px-8"
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        unfollow(alreadyFollowedUser?.id, {
                          onSuccess: () => {
                            queryClient.invalidateQueries({
                              queryKey: ["totalFollowers"],
                            });
                          },
                        })
                      }
                      className="h-[38px] w-full cursor-pointer self-end rounded-md border-2 border-indigo-700   text-sm  font-medium text-indigo-700 hover:bg-stone-100 md:w-min md:px-8"
                    >
                      Following
                    </button>
                  )}
                </div>
              </div>
            </section>

            <section className="mb-5  px-[24px] sm:px-[64px]  lg:px-[24px]">
              <h1 className="mb-3 text-2xl font-bold">Location</h1>
              {/* <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faFilm} /> <p>Online</p>
              </div> */}
              {event?.latitude ? (
                <div className="flex gap-2">
                  <aside className="text-sm">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </aside>
                  <div className="flex w-full flex-col text-sm font-semibold">
                    <div className="mb-1">{event?.city}</div>
                    <div className="mb-1 text-[#6f7287]">{eventAddress}</div>
                    <div
                      role="button"
                      onClick={() => setShowMap(!showMap)}
                      className="flex cursor-pointer items-center gap-1 text-[#3659e3] "
                    >
                      <button>Show Map</button>
                      {!showMap ? (
                        <FontAwesomeIcon icon={faChevronDown} />
                      ) : (
                        <FontAwesomeIcon icon={faChevronUp} />
                      )}
                    </div>
                    {showMap && <EventMapLocation event={event} />}
                  </div>
                </div>
              ) : (
                <p>
                  <FontAwesomeIcon icon={faFilm} className="me-3" /> Online
                </p>
              )}
            </section>
            <section className=" grid  px-[24px] sm:px-[64px]  lg:px-[24px] ">
              <h1 className="mb-3 text-2xl font-bold">About this event</h1>
              <aside className="grid grid-cols-2 gap-4 md:grid-cols-2">
                <div className="flex items-center  gap-3">
                  <div className="flex h-[40px] w-[40px] items-center justify-center rounded-xl bg-[#f8f7fa] text-[#3659e3]">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <p className="text-base font-semibold">
                    {!hasEventEnded
                      ? timeDifference
                      : formatDate(event?.startTime)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-[40px] w-[40px] items-center justify-center rounded-xl bg-[#f8f7fa] text-[#3659e3]">
                    <FontAwesomeIcon icon={faTicketSimple} />
                  </div>
                  <p className="text-base font-semibold">Mobile eTicket</p>
                </div>
              </aside>
              <div className="mt-8 text-base font-normal text-[#6f7287]">
                <p>{event?.about}</p>
              </div>
            </section>

            {event?.eventAgends.length !== 0 && (
              <section className=" relative px-[24px]  sm:px-[64px] lg:px-[24px] ">
                <h1 className="text-2xl font-bold">Agenda</h1>
                <div className="mt-3 flex items-center gap-x-2">
                  {event?.eventAgends?.map((eventAgend) => (
                    <button
                      onClick={() => setActiveEventAgend(eventAgend)}
                      className={`${
                        activeEventAgend?.id === eventAgend.id
                          ? "bg-blue-600 text-white"
                          : "bg-transparent text-black"
                      } rounded-full  px-4 py-1 font-medium `}
                      key={eventAgend.id}
                    >
                      {eventAgend.title}
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex w-3/4 flex-col rounded-lg  bg-red-100  py-3">
                  <div className="ms-5 border-l-2 border-orange-600 ps-5">
                    <p>
                      {extractTimeFromDate(activeEventAgend?.startTime)} -{" "}
                      {extractTimeFromDate(activeEventAgend?.endTime)}
                    </p>
                    <p className="text-xl font-medium">
                      {activeEventAgend?.title}
                    </p>
                    <p className="mt-2 w-fit rounded-md bg-white px-3 py-2">
                      {activeEventAgend?.speaker}
                    </p>
                    <hr className="my-3" />
                    <p className="text-sm">{activeEventAgend?.description}</p>
                  </div>
                </div>
              </section>
            )}

            {event?.tags?.length > 0 && (
              <section className=" px-[24px] sm:px-[64px]  lg:px-[24px] ">
                <h1 className="text-2xl font-bold">Tags</h1>
                <div className="my-9 flex flex-wrap gap-x-4 gap-y-4">
                  {event?.tags?.map((tag) => (
                    <div
                      key={tag}
                      className="rounded-full bg-gray-50 px-3 py-2 hover:cursor-pointer hover:bg-gray-200"
                    >
                      #{tag}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-5 px-[24px] sm:px-[64px]  lg:px-[24px] ">
              <h1 className="text-2xl font-bold">About the Organizer</h1>
              <div
                className="my-9 rounded-xl bg-white p-8 sm:p-10 "
                style={{ boxShadow: "0 0 20px 3px rgba(180, 180, 180 , 1)" }}
              >
                <div className="mb-6">
                  <div className="mx-auto h-20 w-20  ">
                    <img
                      className="h-[inherit] w-[inherit] rounded-full object-cover object-center"
                      src={event?.user?.imageUrl}
                      alt=""
                    />
                  </div>
                </div>
                <div className="mb-7 text-center">
                  <div className=" mb-2 text-sm text-[#6f7287]">
                    Organized by
                  </div>
                  <nav>
                    <Link
                      to={`/user/${event?.user?.firstName}-${event?.user?.lastName}-${event?.userId}`}
                      className="text-xl font-semibold hover:text-[#3659e3] hover:underline"
                    >
                      {event?.user?.firstName} {event?.user?.lastName}
                    </Link>
                  </nav>
                </div>
                <div className="my-6">
                  <div className="grid justify-center text-center ">
                    <span className="text-xl font-bold">{totalFollowers}</span>
                    <span className="text-sm text-[#6f7287]">Followers</span>
                  </div>
                </div>
                <ul className="mb-8 grid w-full justify-center gap-3  xs:flex">
                  <li>
                    {" "}
                    <button className=" h-11 w-[104px] cursor-pointer  rounded-[4px] text-center text-sm font-semibold text-[#3659e3] transition-all hover:bg-[#f8f7fa]">
                      Contact
                    </button>
                  </li>
                  <li className=" ">
                    {" "}
                    {!alreadyFollowedUser ? (
                      <button
                        onClick={() =>
                          follow(
                            { followedUserId: event?.userId },
                            {
                              onSuccess: () => {
                                queryClient.invalidateQueries({
                                  queryKey: ["totalFollowers"],
                                });
                              },
                            },
                          )
                        }
                        className=" h-11 w-[104px] cursor-pointer rounded-[4px] border-[#1f3d7e] bg-[#3659e3] text-center text-sm font-semibold text-white transition-all hover:border-[2px]"
                      >
                        Follow
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          unfollow(alreadyFollowedUser?.id, {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: ["totalFollowers"],
                              });
                            },
                          })
                        }
                        className="h-[38px] w-full cursor-pointer self-end rounded-md border-2 border-indigo-700   text-sm  font-medium text-indigo-700 hover:bg-stone-100 md:w-min md:px-8"
                      >
                        Following
                      </button>
                    )}
                  </li>
                </ul>
                <p>{event?.user?.bio}</p>
              </div>
            </section>

            <section className=" px-[24px] sm:px-[64px]  lg:px-[24px] ">
              <div
                onClick={() => setClickedModal(true)}
                className="mx-auto flex w-min cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-[4px] px-8 py-2 text-[#3659e3] transition-all
          hover:bg-[#f8f7fa]"
              >
                <FontAwesomeIcon icon={faFlag} /> <span>Report this event</span>
              </div>
            </section>
            {clickedModal && (
              <>
                <ReportModal setClickedModal={setClickedModal} />
                <Overlay />
              </>
            )}
            {suggestedEvents?.length > 0 && (
              <section className="mt-5 grid gap-2  px-[24px] sm:px-[64px]  lg:px-[24px]">
                <h1 className="mb-4 text-2xl font-bold">
                  {" "}
                  More events from this organizer
                </h1>
                <aside className="flex flex-col gap-y-3 sm:h-[200px]">
                  {suggestedEvents?.map((event) => (
                    <LikedEvent key={event.id} event={event} />
                  ))}
                </aside>
              </section>
            )}
          </div>

          <div
            ref={scrollerRef}
            className="fixed bottom-0 left-0  z-20 flex  w-full overscroll-y-contain bg-white font-normal shadow-customHower1 lg:relative lg:block  lg:w-[35%] lg:pl-[44px] lg:pt-[64px]  lg:shadow-none"
          >
            <div
              ref={contentRef}
              className=" grid w-full  gap-5  border-[2px] border-[#eeedf2] p-6  lg:rounded-lg"
              style={divStyle}
            >
              {!hasEventEnded ? (
                <div className="rounded-lg border-2 border-[#3d64ff] p-4">
                  <div className="flex w-full items-center justify-between">
                    <div className="text-base font-semibold">Attendance</div>
                    <div className="flex items-center gap-3">
                      <div
                        role="button"
                        className="grid h-8 w-8 content-center justify-center rounded-lg bg-[#eeedf2] text-3xl text-[#a9a8b3] hover:cursor-pointer"
                      >
                        -
                      </div>
                      <span className="text-xl font-semibold">
                        {event?.capacity ? event.capacity : 1}
                      </span>
                      <div
                        role="button"
                        className="grid h-8 w-8 content-center justify-center rounded-lg bg-[#3d64ff] text-3xl text-white hover:cursor-pointer"
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 text-base font-semibold">
                    <span>{event?.price ? `${event.price}€` : "Free"}</span>{" "}
                    <FontAwesomeIcon
                      className="cursor-pointer rounded-full p-2 text-base text-[#3d64ff] hover:bg-[#f8f7fa]"
                      icon={faCircleExclamation}
                      onClick={handleIconClick}
                    />
                  </div>
                  {isTextVisible && (
                    <div className="text-right text-sm font-normal">
                      Sales end on Mar 26, 2024
                    </div>
                  )}
                </div>
              ) : (
                <h1 className="mx-auto text-xl font-medium">Sales Ended</h1>
              )}
              <div>
                {!hasEventEnded ? (
                  <button className="h-12 w-full rounded-md bg-[#d1410c] font-semibold text-white ">
                    Reserve a Spot
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/filter-events")}
                    className="h-12 w-full rounded-md bg-[#d1410c] font-semibold text-white "
                  >
                    Explore new Events
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* <section ref={bottomRef} className="mb-64 bg-[#f8f7fa] lg:mb-0">
          <aside className="mx-auto  p-6 lg:max-w-[1200px]">
            <div className="mb-8 flex justify-between">
              <h1 className="text-2xl font-bold text-[#4b4d63]">
                Other events you may like
              </h1>
              <div className="flex gap-2">
                <button className="h-10 w-10 bg-[#dbdae3]">
                  {" "}
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="text-[#6f7287]"
                  />
                </button>
                <button className="h-10 w-10 bg-[#4b4d63]">
                  <FontAwesomeIcon icon={faArrowRight} className="text-white" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 grid-rows-1 gap-4 overflow-y-hidden  pt-8 md:grid-cols-3 ">
              <div
                className="relative  w-full rounded-[32px] bg-white shadow-custom hover:shadow-cutomHower"
                style={{ aspectRatio: "1/1" }}
              >
                <div className=" cursor-pointer " style={{ height: "53% " }}>
                  <img
                    className=" w-full rounded-b-md rounded-t-[32px] border-[1px] border-[#dbdae3] object-cover"
                    style={{ height: "100%" }}
                    src="https://images.pexels.com/photos/15828082/pexels-photo-15828082/free-photo-of-mountain-lake-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                </div>
                <div className="px-4 py-8">
                  <div className="cursor-pointer text-lg font-bold text-[#39364f]">
                    name
                  </div>
                  <div className="mr-8 pb-1 pt-2 text-sm font-normal text-[#d1410c]">
                    time
                  </div>
                  <aside className="mr-8 text-base  md:text-sm ">
                    <div className="text-[#6f7287]">location</div>
                    <div className="text-[#6f7287]">price</div>
                    <div className="mt-2 pt-1 font-semibold text-[#39364f]">
                      <div>organizers name</div>

                      <div>
                        <FontAwesomeIcon icon={faUser} />
                        organizers followers
                      </div>
                    </div>
                  </aside>
                </div>
                <div className="absolute right-9 flex h-12  w-12 -translate-y-64 transform cursor-pointer items-center justify-center rounded-full  border-2 border-[#dbdae3] bg-white text-[#4b4d63] hover:bg-[#f8f7fa] md:-translate-y-60">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
              <div
                className="relative  w-full rounded-[32px] bg-white shadow-custom hover:shadow-cutomHower"
                style={{ aspectRatio: "1/1" }}
              >
                <div className=" cursor-pointer " style={{ height: "53% " }}>
                  <img
                    className=" w-full rounded-b-md rounded-t-[32px] border-[1px] border-[#dbdae3] object-cover"
                    style={{ height: "100%" }}
                    src="https://images.pexels.com/photos/15828082/pexels-photo-15828082/free-photo-of-mountain-lake-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                </div>
                <div className="px-4 py-8">
                  <div className="cursor-pointer text-lg font-bold text-[#39364f]">
                    name
                  </div>
                  <div className="mr-8 pb-1 pt-2 text-sm font-normal text-[#d1410c]">
                    time
                  </div>
                  <aside className="mr-8 text-base  md:text-sm ">
                    <div className="text-[#6f7287]">location</div>
                    <div className="text-[#6f7287]">price</div>
                    <div className="mt-2 pt-1 font-semibold text-[#39364f]">
                      <div>organizers name</div>

                      <div>
                        <FontAwesomeIcon icon={faUser} />
                        organizers followers
                      </div>
                    </div>
                  </aside>
                </div>
                <div className="absolute right-9 flex h-12  w-12 -translate-y-64 transform cursor-pointer items-center justify-center rounded-full  border-2 border-[#dbdae3] bg-white text-[#4b4d63] hover:bg-[#f8f7fa] md:-translate-y-60">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
              <div
                className="relative  w-full rounded-[32px] bg-white shadow-custom hover:shadow-cutomHower"
                style={{ aspectRatio: "1/1" }}
              >
                <div className=" cursor-pointer " style={{ height: "53% " }}>
                  <img
                    className=" w-full rounded-b-md rounded-t-[32px] border-[1px] border-[#dbdae3] object-cover"
                    style={{ height: "100%" }}
                    src="https://images.pexels.com/photos/15828082/pexels-photo-15828082/free-photo-of-mountain-lake-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                </div>
                <div className="px-4 py-8">
                  <div className="cursor-pointer text-lg font-bold text-[#39364f]">
                    name
                  </div>
                  <div className="mr-8 pb-1 pt-2 text-sm font-normal text-[#d1410c]">
                    time
                  </div>
                  <aside className="mr-8 text-base  md:text-sm ">
                    <div className="text-[#6f7287]">location</div>
                    <div className="text-[#6f7287]">price</div>
                    <div className="mt-2 pt-1 font-semibold text-[#39364f]">
                      <div>organizers name</div>

                      <div>
                        <FontAwesomeIcon icon={faUser} />
                        organizers followers
                      </div>
                    </div>
                  </aside>
                </div>
                <div className="absolute right-9 flex h-12  w-12 -translate-y-64 transform cursor-pointer items-center justify-center rounded-full  border-2 border-[#dbdae3] bg-white text-[#4b4d63] hover:bg-[#f8f7fa] md:-translate-y-60">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
            </div>
          </aside>
        </section> */}
      </div>
    </>
  );
}

export default EventDetails;
