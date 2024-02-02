import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function YourComponent() {
  const { city } = useParams();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-row gap-2 pb-10 text-sm ">
        <p className="text-blue-700 underline">
          {" "}
          <Link to="/"> Home </Link>{" "}
        </p>
        /
        <p className="text-blue-700 underline">
          {" "}
          <Link to="#"> Kosovo </Link>{" "}
        </p>
        /
        <p className="text-blue-700 underline">
          {" "}
          <Link to="#"> Things to do in {city} </Link>{" "}
        </p>
        /
        <p className=" text-black-700">
          {" "}
          <Link to="#"> Events in {city} </Link>{" "}
        </p>
      </div>
      <div className="mx-auto flex  h-[29pc] max-w-[1272px] justify-around ">
        <div className="m-auto ml-10 w-[31.7%]  pt-7 ">
          <p className="">Best events in {city}</p>
          <div className="flex items-center  text-[24px] text-[#3659e3]">
            <FontAwesomeIcon icon={faChevronDown} className="" />

            <input
              type="text"
              disabled
              className=" border-none text-5xl font-extrabold outline-none  placeholder:text-[#3659e3]  "
              value={inputValue}
              onChange={handleInputChange}
              placeholder={city}
            />
          </div>
          <p className="text-base font-normal">
            Looking for things to do in {city}? Whether you're a local, new in
            town or just cruising through we've got loads of great tips and
            events. You can explore by location, what's popular, our top picks,
            free stuff... you got this. Ready?
          </p>
        </div>
        <div className="ml-[8.3%] w-[68.3%] ">
          <img
            style={{ aspectRatio: "auto 488 / 791" }}
            className="h-[100%] w-[100%]"
            src="https://cdn.evbstatic.com/s3-build/fe/build/images/6de029e578804a108636e185058cfc0c-YGP_citybrowseheader_Generic_791x488px@2x.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
