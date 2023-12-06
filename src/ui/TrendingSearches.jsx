import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
export default function TrendingSearches() {
  return (
    <div className="flex-col justify-content w-[87%] ml-28 m-8">
     <h2 className="flex gap-2  ">
        <p className="text-[#4b4d63] text-2xl font-bold tracking-[0.25px] leading-8 hover:text-sky-600 hover:underline cursor-pointer">Trending Searches</p>
        <p className="text-[#4b4d63] text-2xl font-bold tracking-[0.25px] leading-8"><FontAwesomeIcon icon={faArrowTrendUp} /></p> </h2>
      <ul className="grid grid-cols-4 text-center gap-y-5 gap-x-3 p-8 text-[#3d64ff] font-medium text-sm tracking-[.25px] ">
        <li className="p-6 border-b-2" > <Link to="#"> 1.Kosovo </Link></li>
        <li className="p-6 border-b-2"> <Link to="#"> 2.Lipjan </Link></li>
        <li className="p-6 border-b-2"> <Link to="#"> 3.Dokufest </Link> </li>
        <li className="p-6 border-b-2"> <Link to="#"> 4.sunny hill </Link> </li>
        <li className="p-6 border-b-2"> <Link to="#"> 5.Kosovo </Link></li>
        <li className="p-6 border-b-2"> <Link to="#"> 6.Kosovo </Link></li>
        <li className="p-6 border-b-2"> <Link to="#"> 7.Kosovo </Link></li>
        <li className="p-6 border-b-2"> <Link to="#"> 8.Kosovo </Link> </li>
        <li className="p-6 border-b-2"> <Link to="#"> 9.Kosovo </Link></li>
        <li className="p-6 border-b-2"> <Link to="#"> 10.Kosovo </Link></li>
        <li className="p-6 border-b-2"> <Link to="#"> 11.Kosovo </Link></li>
        <li className="p-6 border-b-2"> <Link to="#"> 12.Kosovo </Link></li>
        
      </ul>
      
      
    </div>
  );
}
