import { axiosRequest } from "./baseApiRequest";

export async function getFollowings() {
  try {
    const response = await axiosRequest("get", `Follow`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function unfollow(followId) {
  try {
    const response = await axiosRequest("delete", `Follow/${followId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function followOrganizer(followOrganizerObj) {
  try {
    const response = await axiosRequest("post", "Follow", followOrganizerObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSuggestedOrganizers() {
  try {
    const response = await axiosRequest("get", "Follow/suggest/organizers");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTotalFollowers(userId) {
  try {
    const response = await axiosRequest(
      "get",
      `Follow/followers/total/${userId}`,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
