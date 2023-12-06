import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Tickets() {
  return (
    <div className="m-auto flex h-screen w-[87%] bg-gradient-to-b from-[#f9f8fa]   to-[#ffffff] pl-10 pt-10  text-black">
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
            <p className="text-3xl font-bold tracking-[.75px]">Elon Bytyqi </p>
            <button className="text-base ">
              <FontAwesomeIcon icon={faPen} style={{ color: "#474747" }} />
            </button>
          </div>

          <p className="flex gap-x-3 text-sm font-normal tracking-normal  text-[#4b4d63]">
            <span className="hover:text-base hover:text-sky-700 hover:underline">
              <Link to="#"> 0 orders </Link>
            </span>{" "}
            <br />
            <span className="list-item hover:text-base hover:text-sky-700 hover:underline">
              <Link to="#"> 0 likes </Link>
            </span>
            <br />
            <span className="list-item hover:text-base hover:text-sky-700 hover:underline">
              <Link to="#"> 0 following </Link>
            </span>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
