import { axiosRequest } from "./baseApiRequest";

export async function getFormats() {
  try {
    const response = await axiosRequest("get", `Formats`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
