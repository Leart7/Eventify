import axios from "axios";

const baseUrl = "https://localhost:7214/api/Auth";

export async function authAxiosRequest(
  method,
  url,
  data = null,
  params = null,
  customErrorMessages = {},
) {
  const token = localStorage.getItem("JwtToken");

  try {
    const response = await axios({
      method,
      url: `${baseUrl}/${url}`,
      data,
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      const customMessage =
        customErrorMessages && customErrorMessages[statusCode];

      if (customMessage) {
        throw new Error(customMessage);
      }
    }

    throw new Error(error.message);
  }
}
