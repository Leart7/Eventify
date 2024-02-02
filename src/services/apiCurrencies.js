import { axiosRequest } from "./baseApiRequest";

export async function getCurrencies() {
  try {
    const response = await axiosRequest("get", `Currency`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
