import { useParams } from "react-router-dom";
import { useTotalEventsByUser } from "../../reactQuery/useTotalEventsByUser";
import { useTotalFollowers } from "../../reactQuery/useTotalFollowers";
import { useGetFollowings } from "../../reactQuery/useGetFollowings";
import { useQueryClient } from "@tanstack/react-query";
import { useFollowOrganizer } from "../../reactQuery/useFollowOrganizer";
import { useUnfollow } from "../../reactQuery/useUnfollow";
import { usePublicUser } from "../../reactQuery/usePublicUser";

function UserIntro() {
  const { name } = useParams();
  const userId = name?.split("-").slice(2, name.length).join("-");
  const queryClient = useQueryClient();

  const { publicUser } = usePublicUser(userId);

  const { followings } = useGetFollowings();
  const { follow } = useFollowOrganizer();
  const { unfollow } = useUnfollow();
  const { totalEvents } = useTotalEventsByUser(userId);
  const { totalFollowers } = useTotalFollowers(userId);

  const alreadyFollowedUser = followings?.find(
    (user) => user.followedUserId === userId,
  );

  const imageUrl = publicUser?.imageUrl || "fallback_image_url";

  return (
    <>
      <div
        className="absolute inset-0 -z-[2] h-40 w-full blur-sm lg:h-[85%]"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: "cover",
        }}
      ></div>

      <div className="mt-28 flex flex-col gap-y-5 lg:mx-auto lg:w-3/4 lg:rounded-xl  lg:bg-white lg:py-14 lg:shadow-md xl:w-[60%] 2xl:w-[45%]">
        <img
          className="mx-auto h-20 w-20 rounded-full bg-red-200 shadow-md ring-4 ring-white"
          src={imageUrl}
          alt="User Profile"
        />

        <div className="mx-auto text-center ">
          <h1 className="text-4xl font-bold" style={{ color: "#1e0a3c" }}>
            {publicUser?.firstName} {publicUser?.lastName}
          </h1>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex flex-col items-center border-r-2 pe-11">
              <p className="text-xl font-semibold">{totalFollowers}</p>
              <p>Followers</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xl font-semibold">{totalEvents}</p>
              <p>Total events</p>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full items-center justify-center gap-x-5 ">
          {!alreadyFollowedUser ? (
            <button
              onClick={() =>
                follow(
                  { followedUserId: userId },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["totalFollowers"],
                      });
                    },
                  },
                )
              }
              className="mx-auto h-11 w-3/4 cursor-pointer self-end rounded-md bg-indigo-700 text-sm font-medium text-white hover:bg-indigo-800 md:px-8 lg:mx-0   lg:w-1/5"
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
              className="mx-auto h-11 w-3/4 cursor-pointer self-end rounded-md border-2 border-indigo-700 text-sm   font-medium  text-indigo-700 hover:bg-stone-100 md:w-min md:px-8 lg:w-1/5"
            >
              Following
            </button>
          )}
          <button className="hidden h-11 w-1/5 cursor-pointer rounded-[4px]  text-center text-sm font-semibold text-[#3659e3] transition-all hover:bg-[#f8f7fa] lg:block">
            Contact
          </button>
        </div>
        <p className="mx-auto my-5 hidden  text-sm lg:block lg:w-[60%]">
          {publicUser?.bio}
        </p>
      </div>
    </>
  );
}

export default UserIntro;
