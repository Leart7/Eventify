import { axiosRequest } from "./baseApiRequest";

export async function getCategories() {
  try {
    const response = await axiosRequest("get", `Category`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
