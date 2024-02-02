import { axiosRequest } from "./baseApiRequest";

export async function getReportReasons() {
  try {
    const response = await axiosRequest("get", `ReportEvent`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
