import React from "react";

export default function CreateEventHome() {
  return (
    <div className="relative h-max">
      <div className="h-[15pc] w-full bg-white">
        <img
          className="m-auto h-[35pc] w-[86%] object-cover"
          src="https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/a_organizer_event--creator-eventbrite-.webp"
          alt="img"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-white  ">
          <div className=" flex justify-center pt-[8pc] text-center ">
            <p className="border-b-2 border-solid  border-orange-500 text-sm font-bold">
              Home{" "}
            </p>
            <p className="ml-2 text-sm font-bold">/ </p>
            <p className="ml-2 text-sm font-bold">Create Events</p>
          </div>
          <h1 className="w-screen  pt-[3pc] text-[51px]  font-extrabold text-white  ">
            Where Event Organizers Grow
          </h1>
        </div>
      </div>
      <div className=" h-[40pc] w-full bg-[#1e0a3c]"></div>
    </div>
  );
}
