import { axiosRequest } from "./baseApiRequest";

export async function getClosedAccountReasons() {
  try {
    const response = await axiosRequest("get", `ClosedAccount`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createClosedAccountReason(closedAccountReasonObj) {
  try {
    const response = await axiosRequest(
      "post",
      `ClosedAccount`,
      closedAccountReasonObj,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
