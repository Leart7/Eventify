import { axiosRequest } from "./baseApiRequest";

export async function reportEvent(reportObj) {
  try {
    const response = await axiosRequest("post", `ReportEvent`, reportObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
