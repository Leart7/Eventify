import { useState } from "react";
import { useModalCloser } from "../hooks/useModalCloser";
import { useUser } from "../reactQuery/useUser";
import FollowSignInModal from "./FollowSignInModal";
import Overlay from "./Overlay";
import { useFollowOrganizer } from "../reactQuery/useFollowOrganizer";
import { useGetFollowings } from "../reactQuery/useGetFollowings";
import { useUnfollow } from "../reactQuery/useUnfollow";
import { Link } from "react-router-dom";

function OrganizerCard({ organizer }) {
  const [temporaryFollowings, setTemporaryFollowings] = useState([]);

  const { user } = useUser();
  const { followings } = useGetFollowings();
  const { follow } = useFollowOrganizer();
  const { unfollow } = useUnfollow();

  const isUserFollowed =
    user &&
    (followings?.followedUserId === organizer.followedUserId ||
      temporaryFollowings.includes(organizer.followedUserId));

  const followedUser = followings?.find(
    (follow) => follow.followedUserId === organizer.followedUserId,
  );

  const [clickedModal, setClickedModal] = useModalCloser();
  const [clickedOrganizer, setClickedOrganizer] = useState(null);

  const [followersCount, setFollowersCount] = useState(
    organizer.followersCount,
  );

  return (
    <>
      <Link
        role="button"
        to={`/user/${organizer?.firstName}-${organizer?.lastName}-${organizer?.followedUserId}`}
        className="flex h-[295px]  w-[247px] items-center justify-center"
      >
        <div className="grid h-[295px] w-[215px] place-items-center  items-start justify-center px-3  py-6 shadow-custom hover:shadow-cutomHower">
          <div className="mb-4 h-[74px] w-[74px] cursor-pointer overflow-hidden rounded-full">
            <img className="h-full w-full" src={organizer.imageUrl} alt="" />
          </div>
          <div className="text-center">
            <h3 className="mb-1 cursor-pointer text-lg font-bold text-[#39364f]">
              {organizer.firstName} {organizer.lastName}
            </h3>
            <h6 className="cursor-pointer text-sm font-normal text-[#a9a8b3]">
              {followersCount} followers
            </h6>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setClickedOrganizer(organizer);
              setTemporaryFollowings([
                ...temporaryFollowings,
                organizer.followedUserId,
              ]);
              if (!temporaryFollowings.includes(organizer.followedUserId)) {
                if (!user) {
                  setClickedModal(true);
                } else {
                  setFollowersCount((followersCount) => followersCount + 1);
                  follow({ followedUserId: organizer.followedUserId });
                }
              } else {
                unfollow(followedUser.id);
                setFollowersCount((followersCount) => followersCount - 1);
                setTemporaryFollowings([
                  temporaryFollowings.filter((f) => f !== organizer.id),
                ]);
              }
            }}
            className={`${
              isUserFollowed
                ? "border-2 border-indigo-700   text-indigo-700 hover:bg-stone-100"
                : "bg-indigo-700 text-white hover:bg-indigo-800"
            } h-[38px] cursor-pointer self-end rounded-md  px-8 text-sm font-medium  `}
          >
            {isUserFollowed ? "Following" : "Follow"}
          </button>
        </div>
      </Link>
      {clickedModal && (
        <>
          <FollowSignInModal
            clickedOrganizer={clickedOrganizer}
            setClickedModal={setClickedModal}
          />
          <Overlay />
        </>
      )}
    </>
  );
}

export default OrganizerCard;
