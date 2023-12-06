import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
export default function EventCard() {
  return (
    
    <div
      className=" w-full  sm:w-1/2 md:py-4 md:px-4 px-0  md:w-1/3 sm:px-2 py-2  relative  xl:w-1/4  "
     style={{}}
    >
        <div className="bg-white hover:shadow-cutomHower shadow-custom " style={{ aspectRatio: "1/1" , }}>
            <div className=" cursor-pointer" style={{ height: "53% " }}>
        <img
          className=" w-full object-cover border-[1px] border-[#dbdae3]"
          style={{ height: "100%" }}
          src="https://images.pexels.com/photos/15828082/pexels-photo-15828082/free-photo-of-mountain-lake-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className="px-4 py-8">
        <div className="text-lg font-bold text-[#39364f] cursor-pointer">name</div>
        <div className="mr-8 pb-1 pt-2 text-sm font-normal text-[#d1410c]">
          time
        </div>
        <aside className="mr-8 text-base  md:text-sm ">
          <div className="text-[#6f7287]">location</div>
          <div className="text-[#6f7287]">price</div>
          <div className="pt-1 font-semibold mt-2 text-[#39364f]">
            <div>organizers name</div>
            
            <div><FontAwesomeIcon icon={faUser} />organizers followers</div>
          </div>
        </aside>
        
      </div><div className="w-12 h-12 top-[8.9rem] cursor-pointer right-10 border-2 text-[#4b4d63] border-[#dbdae3] hover:bg-[#f8f7fa]  bg-white rounded-full absolute flex justify-center items-center">
        <FontAwesomeIcon icon={faHeart} />
        </div>
        </div>
      
      <div className="absolute top-1 right-0 border-2 border-white rounded-[14px] px-[10px] py-[2px] bg-[#6f7287] text-center font-semibold text-white text-sm ">Sold out</div>
    </div>
  );
}
