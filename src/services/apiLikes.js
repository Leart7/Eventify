import { axiosRequest } from "./baseApiRequest";

export async function getLikes() {
  try {
    const response = await axiosRequest("get", `Like`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function likeEvent(likeObj) {
  try {
    const response = await axiosRequest("post", `Like`, likeObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function dislikeEvent(likeId) {
  try {
    const response = await axiosRequest("delete", `Like/${likeId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
