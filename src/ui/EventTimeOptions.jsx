import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function EventTimeOptions() {
  return (
    <>
    <h2 className='text-[#444552] text-2xl font-bold ml-28 pt-12'>Event time options</h2>
    <section className='bg-slate-300 h-36 mt-11 ml-[7%] pt-6 px-7 flex gap-7 w-[86%] overflow-x-scroll 'style={{display:"-webkit-box"}} >
        
        <div className='flex gap-x-8  relative  bg-white w-[290px] h-[95px] ' >
            <div className='bg-slate-300 absolute top-[-12px] left-[-12px] h-[72px] w-[72px] rounded-full flex items-center justify-center'><span className='text-blue-700 text-xl'><FontAwesomeIcon icon={faClock} /></span>
           
                </div>
                <p className='w-full text-center pt-8 text-[#3659e3] font-semibold leading-7tracking-tight  hover:underline	' > <Link to="#"> Today </Link>{" "}</p>
        </div>
        <div className='flex gap-x-8  relative  bg-white w-[290px] h-[95px]' >
            <div className='bg-slate-300 absolute top-[-12px] left-[-12px] h-[72px] w-[72px] rounded-full flex items-center justify-center'><span className='text-blue-700 text-xl'><FontAwesomeIcon icon={faClock} /></span>
           
                </div>
                <p className='w-full text-center pt-8 text-[#3659e3] font-semibold leading-7tracking-tight hover:underline		' > <Link to="#"> Tomorrow </Link>{" "}</p>
        </div>
        <div className='flex gap-x-8  relative  bg-white w-[290px] h-[95px]' >
            <div className='bg-slate-300 absolute top-[-12px] left-[-12px] h-[72px] w-[72px] rounded-full flex items-center justify-center'><span className='text-blue-700 text-xl'><FontAwesomeIcon icon={faClock} /></span>
           
                </div>
                <p className='w-full text-center pt-8 text-[#3659e3] font-semibold leading-7tracking-tight unerline	hover:underline	' > <Link to="#"> This weekend </Link>{" "}</p>
        </div>
        <div className='flex gap-x-8    relative  bg-white w-[290px] h-[95px]' >
            <div className='bg-slate-300 absolute top-[-12px] left-[-12px] h-[72px] w-[72px] rounded-full flex items-center justify-center'><span className='text-blue-700 text-xl'><FontAwesomeIcon icon={faClock} /></span>
           
                </div>
                <p className=' pt-8 w-full text-center text-[#3659e3] font-semibold leading-7 selection:tracking-tight hover:underline ' > <Link to="#">This week </Link>{" "}</p>
        </div>
        <div className='flex gap-x-8    relative  bg-white w-[300px] h-[95px]' >
            <div className='bg-slate-300 absolute top-[-12px] left-[-12px] h-[72px] w-[72px] rounded-full flex items-center justify-center'><span className='text-blue-700 text-xl'><FontAwesomeIcon icon={faClock} /></span>
           
                </div>
                <p className=' pt-8 w-full text-center text-[#3659e3] font-semibold leading-7 selection:tracking-tight hover:underline ' > <Link to="#">Next week </Link>{" "}</p>
        </div>
        <div className='flex gap-x-8    relative  bg-white w-[300px] h-[95px]' >
            <div className='bg-slate-300 absolute top-[-12px] left-[-12px] h-[72px] w-[72px] rounded-full flex items-center justify-center'><span className='text-blue-700 text-xl'><FontAwesomeIcon icon={faClock} /></span>
           
                </div>
                <p className=' pt-8 w-full text-center text-[#3659e3] font-semibold leading-7 selection:tracking-tight hover:underline ' > <Link to="#">This month </Link>{" "}</p>
        </div>
        <div className='flex gap-x-8    relative  bg-white w-[300px] h-[95px]' >
            <div className='bg-slate-300 absolute top-[-12px] left-[-12px] h-[72px] w-[72px] rounded-full flex items-center justify-center'><span className='text-blue-700 text-xl'><FontAwesomeIcon icon={faClock} /></span>
           
                </div>
                <p className=' pt-8 w-full text-center text-[#3659e3] font-semibold leading-7 selection:tracking-tight hover:underline ' > <Link to="#">This week </Link>{" "}</p>
        </div>
        
    </section>
    </>
  )
}
