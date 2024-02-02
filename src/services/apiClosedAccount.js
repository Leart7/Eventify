import { authAxiosRequest } from "./baseAuthApiRequest";

export async function closeAccount(closeAccountObj) {
  try {
    const response = await authAxiosRequest(
      "delete",
      `delete-account`,
      closeAccountObj,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
