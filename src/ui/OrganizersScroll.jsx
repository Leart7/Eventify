import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import  useDragScroll  from "../hooks/useDragScroll";
export default function OrganizersScroll() {
  const {
    containerRef,
    contentRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDragScroll();

  return (
    <section>
      <div ref={containerRef} onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}>
        <div className=" mb-4 text-2xl font-bold text-[#1e0a3c]">
          <FontAwesomeIcon icon={faUser} className="mr-2 text-[32px]" />
          Organizers To Follow
        </div>

        <aside
          className="grid grid-flow-col justify-start gap-1 overflow-x-scroll pl-2"
          ref={contentRef}
          
        >
          <div className="flex h-[295px]  w-[247px] items-center justify-center">
            <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
              <div className="mb-4 h-[74px] w-[74px] cursor-pointer overflow-hidden rounded-full">
                <img
                  className="h-full w-full"
                  src="https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="text-center">
                <h3 className="mb-1 cursor-pointer text-lg font-bold text-[#39364f]">
                  Name of the Organization
                </h3>
                <h6 className="cursor-pointer text-sm font-normal text-[#a9a8b3]">
                  Followers
                </h6>
              </div>
              <button className="h-[38px] cursor-pointer self-end rounded-md bg-indigo-700 px-8 text-sm font-medium text-white hover:bg-indigo-800">
                Follow
              </button>
            </div>
          </div>
          <div className="flex h-[295px]  w-[247px] items-center justify-center">
            <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
              <div className="mb-4 h-[74px] w-[74px] overflow-hidden rounded-full">
                <img
                  className="h-full w-full"
                  src="https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="text-center">
                <h3 className="mb-1 text-lg font-bold text-[#39364f]">
                  Name of the Organization
                </h3>
                <h6 className="text-sm font-normal text-[#a9a8b3]">
                  Followers
                </h6>
              </div>
              <button className="h-[38px] cursor-pointer self-end rounded-md bg-indigo-700 px-8 text-sm font-medium text-white hover:bg-indigo-800">
                Follow
              </button>
            </div>
          </div>
          <div className="flex h-[295px]  w-[247px] items-center justify-center">
            <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
              <div className="mb-4 h-[74px] w-[74px] overflow-hidden rounded-full">
                <img
                  className="h-full w-full"
                  src="https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="text-center">
                <h3 className="mb-1 text-lg font-bold text-[#39364f]">
                  Name of the Organization
                </h3>
                <h6 className="text-sm font-normal text-[#a9a8b3]">
                  Followers
                </h6>
              </div>
              <button className="h-[38px] cursor-pointer self-end rounded-md bg-indigo-700 px-8 text-sm font-medium text-white hover:bg-indigo-800">
                Follow
              </button>
            </div>
          </div>
          <div className="flex h-[295px]  w-[247px] items-center justify-center">
            <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
              <div className="mb-4 h-[74px] w-[74px] overflow-hidden rounded-full">
                <img
                  className="h-full w-full"
                  src="https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="text-center">
                <h3 className="mb-1 text-lg font-bold text-[#39364f]">
                  Name of the Organization
                </h3>
                <h6 className="text-sm font-normal text-[#a9a8b3]">
                  Followers
                </h6>
              </div>
              <button className="h-[38px] cursor-pointer self-end rounded-md bg-indigo-700 px-8 text-sm font-medium text-white hover:bg-indigo-800">
                Follow
              </button>
            </div>
          </div>
          <div className="flex h-[295px]  w-[247px] items-center justify-center">
            <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
              <div className="mb-4 h-[74px] w-[74px] overflow-hidden rounded-full">
                <div className="flex h-[295px] w-[247px] items-center justify-center overflow-hidden">
                  <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
                    <div className="mb-4 h-[74px] w-[74px] overflow-hidden rounded-full">
                      <img
                        className="h-full w-full"
                        src="https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="mb-1 text-lg font-bold text-[#39364f]">
                        Name of the Organization
                      </h3>
                      <h6 className="text-sm font-normal text-[#a9a8b3]">
                        Followers
                      </h6>
                    </div>
                    <button className="h-[38px] cursor-pointer self-end rounded-md bg-indigo-700 px-8 text-sm font-medium text-white hover:bg-indigo-800">
                      Follow
                    </button>
                  </div>
                </div>
                <div className="flex h-[295px] w-[247px] items-center justify-center overflow-hidden">
                  <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
                    <div className="mb-4 h-[74px] w-[74px] overflow-hidden rounded-full">
                      <img
                        className="h-full w-full"
                        src="https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="mb-1 text-lg font-bold text-[#39364f]">
                        Name of the Organization
                      </h3>
                      <h6 className="text-sm font-normal text-[#a9a8b3]">
                        Followers
                      </h6>
                    </div>
                    <button className="h-[38px] cursor-pointer self-end rounded-md bg-indigo-700 px-8 text-sm font-medium text-white hover:bg-indigo-800">
                      Follow
                    </button>
                  </div>
                </div>
                <div className="flex h-[295px] w-[247px] items-center justify-center overflow-hidden">
                  <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
                    <div className="mb-4 h-[74px] w-[74px] overflow-hidden rounded-full">
                      <img
                        className="h-full w-full"
                        src="https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="mb-1 text-lg font-bold text-[#39364f]">
                        Name of the Organization
                      </h3>
                      <h6 className="text-sm font-normal text-[#a9a8b3]">
                        Followers
                      </h6>
                    </div>
                    <button className="h-[38px] cursor-pointer self-end rounded-md bg-indigo-700 px-8 text-sm font-medium text-white hover:bg-indigo-800">
                      Follow
                    </button>
                  </div>
                </div>
                <div className="flex h-[295px] w-[247px] items-center justify-center overflow-hidden">
                  <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
                    <div className="mb-4 h-[74px] w-[74px] overflow-hidden rounded-full">
                      <img
                        className="h-full w-full"
                        src="https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="mb-1 text-lg font-bold text-[#39364f]">
                        Name of the Organization
                      </h3>
                      <h6 className="text-sm font-normal text-[#a9a8b3]">
                        Followers
                      </h6>
                    </div>
                    <button className="h-[38px] cursor-pointer self-end rounded-md bg-indigo-700 px-8 text-sm font-medium text-white hover:bg-indigo-800">
                      Follow
                    </button>
                  </div>
                </div>
                <img
                  className="h-full w-full"
                  src="https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="text-center">
                <h3 className="mb-1 text-lg font-bold text-[#39364f]">
                  Name of the Organization
                </h3>
                <h6 className="text-sm font-normal text-[#a9a8b3]">
                  Followers
                </h6>
              </div>
              <button className="h-[38px] cursor-pointer self-end rounded-md bg-indigo-700 px-8 text-sm font-medium text-white hover:bg-indigo-800">
                Follow
              </button>
            </div>
          </div>
          <div className="flex h-[295px]  w-[247px] items-center justify-center">
            <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
              <div className="mb-4 h-[74px] w-[74px] overflow-hidden rounded-full">
                <img
                  className="h-full w-full"
                  src="https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="text-center">
                <h3 className="mb-1 text-lg font-bold text-[#39364f]">
                  Name of the Organization
                </h3>
                <h6 className="text-sm font-normal text-[#a9a8b3]">
                  Followers
                </h6>
              </div>
              <button className="h-[38px] cursor-pointer self-end rounded-md bg-indigo-700 px-8 text-sm font-medium text-white hover:bg-indigo-800">
                Follow
              </button>
            </div>
          </div>
          <div className="h-[295px] w-[247px] items-center justify-center placeholder:flex">
            <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
              <div className="mb-4 h-[74px] w-[74px] overflow-hidden rounded-full">
                <img
                  className="h-full w-full"
                  src="https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="text-center">
                <h3 className="mb-1 text-lg font-bold text-[#39364f]">
                  Name of the Organization
                </h3>
                <h6 className="text-sm font-normal text-[#a9a8b3]">
                  Followers
                </h6>
              </div>
              <button className="h-[38px] cursor-pointer self-end rounded-md bg-indigo-700 px-8 text-sm font-medium text-white hover:bg-indigo-800">
                Follow
              </button>
            </div>
          </div>
          <div className="flex h-[295px]  w-[247px] items-center justify-center">
            <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
              <div className="mb-4 h-[74px] w-[74px] overflow-hidden rounded-full">
                <img
                  className="h-full w-full"
                  src="https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="text-center">
                <h3 className="mb-1 text-lg font-bold text-[#39364f]">
                  Name of the Organization
                </h3>
                <h6 className="text-sm font-normal text-[#a9a8b3]">
                  Followers
                </h6>
              </div>
              <button className="h-[38px] cursor-pointer self-end rounded-md bg-indigo-700 px-8 text-sm font-medium text-white hover:bg-indigo-800">
                Follow
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
