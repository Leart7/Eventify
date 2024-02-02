import { axiosRequest } from "./baseApiRequest";

export async function getLanguages() {
  try {
    const response = await axiosRequest("get", `Language`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
