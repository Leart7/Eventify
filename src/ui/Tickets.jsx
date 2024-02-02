import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../reactQuery/useUser";
import { useGetFollowings } from "../reactQuery/useGetFollowings";
import { useUnfollow } from "../reactQuery/useUnfollow";
import { useLikes } from "../reactQuery/useLikes";
import EventCard from "./EventCard";

export default function Tickets() {
  const { user } = useUser();
  const { followings } = useGetFollowings();
  const { likes } = useLikes();
  const navigate = useNavigate();

  const { unfollow } = useUnfollow();

  return (
    <>
      <div className="m-auto w-[87%] bg-gradient-to-b from-[#f9f8fa]   to-[#ffffff] pl-10 pt-10  text-black">
        <div
          className="m-6 flex
  items-start text-black "
        >
          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2   border-solid border-gray-100 bg-white">
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#bababa" }}
              className="text-[38px]"
            />
          </div>
          <div className="flex flex-col gap-y-3 pl-4 pt-6 ">
            <div className="flex flex-row gap-x-4">
              <p className="text-3xl font-bold tracking-[.75px]">
                {user?.firstName} {user?.lastName}{" "}
              </p>
              <button
                className="text-base"
                onClick={() => navigate("/account-settings")}
              >
                <FontAwesomeIcon icon={faPen} style={{ color: "#474747" }} />
              </button>
            </div>

            <p className="flex gap-x-3 text-sm font-normal tracking-normal  text-[#4b4d63]">
              <span className="hover:text-base hover:text-sky-700 hover:underline">
                <Link to="#"> 0 orders </Link>
              </span>{" "}
              <br />
              <span className="list-item hover:text-base hover:text-sky-700 hover:underline">
                <Link to="/favorites/events"> {likes?.length} likes </Link>
              </span>
              <br />
              <span className="list-item hover:text-base hover:text-sky-700 hover:underline">
                <Link to="#"> {followings?.length} following </Link>
              </span>
            </p>
          </div>
        </div>
        <div className="mx-auto w-1/2">
          <Link
            to="/favorites/events"
            className="mb-10 text-2xl font-semibold underline-offset-2 hover:cursor-pointer hover:text-blue-600 hover:underline"
            style={{ color: "#1e0a3c" }}
          >
            Likes <FontAwesomeIcon icon={faArrowRight} className="text-base" />
          </Link>
          <div className="flex flex-wrap items-center gap-x-5">
            {likes?.map((likedEvent) => (
              <EventCard
                key={likedEvent.id}
                event={likedEvent.event}
                like={likedEvent.id}
                from="secondary"
              />
            ))}
          </div>
        </div>
        <hr className="mx-auto my-5 w-1/2"></hr>
        <div className="mx-auto w-1/2">
          <div className="mb-10 flex items-center justify-between">
            <h1 className="text-2xl font-semibold" style={{ color: "#1e0a3c" }}>
              Following
            </h1>
            <Link
              to="/following"
              className="underline-offset-2 hover:text-blue-600 hover:underline"
            >
              See events <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          {followings?.map((organizer) => (
            <div key={organizer.id} className="ms-7 flex items-center gap-x-4">
              <img
                src={organizer.imageUrl}
                className="h-14 w-14 object-cover"
              />
              <Link
                to={`/user/${organizer?.firstName}-${organizer?.lastName}-${organizer?.followedUserId}`}
                className="text-lg font-semibold underline-offset-2 hover:cursor-pointer hover:text-blue-600 hover:underline"
              >
                {organizer.firstName} {organizer.lastName}
              </Link>
              <button
                onClick={() => {
                  unfollow(organizer.id);
                }}
                className={`h-[38px] cursor-pointer  rounded-md border-2 border-indigo-700 px-8 text-sm  font-medium text-indigo-700 hover:bg-stone-100  `}
              >
                Following
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
