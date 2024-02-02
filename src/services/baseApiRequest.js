import axios from "axios";

const baseUrl = "https://localhost:7181/api";

export async function axiosRequest(method, url, data = null, params = null) {
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
    throw new Error(error.message);
  }
}
