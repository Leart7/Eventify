import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { authAxiosRequest } from "./baseAuthApiRequest";

export async function checkEmail(email) {
  try {
    const response = await authAxiosRequest(`get`, `user/exists/${email}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signUp(signUpObj) {
  try {
    const response = await authAxiosRequest(`post`, `Register`, signUpObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function login(loginObj) {
  try {
    const response = await authAxiosRequest(`post`, `Login`, loginObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

const isTokenValid = (token) => {
  try {
    const decodedToken = jwtDecode(token);

    return decodedToken.exp > Math.floor(Date.now() / 1000);
  } catch (error) {
    return false;
  }
};

export async function getCurrentUser() {
  if (!localStorage.getItem("JwtToken")) return null;

  const token = localStorage.getItem("JwtToken");

  if (token && isTokenValid(token)) {
    const response = await axios.get(`https://localhost:7214/api/Auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}

export async function getUser(userId) {
  try {
    const response = await authAxiosRequest(`get`, `user/public/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateUser(updateUserObj) {
  const token = localStorage.getItem("JwtToken");

  const formData = new FormData();

  Object.keys(updateUserObj).forEach((key) => {
    formData.append(key, updateUserObj[key]);
  });

  try {
    const response = await axios.put(
      `https://localhost:7214/api/Auth`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateUserPassword(updatePasswordObj) {
  const customErrorMessages = {
    400: "The current password you entered didn't match our records.",
    409: "Your password wasn't changed. Please enter a new password.",
  };

  return authAxiosRequest(
    "put",
    "update/password",
    updatePasswordObj,
    null,
    customErrorMessages,
  );
}

export async function updateUserEmail(updateEmailObj) {
  const customErrorMessages = {
    400: "Your new email matches the previous one",
    401: "Password incorrect",
  };

  return authAxiosRequest(
    "put",
    "update/email",
    updateEmailObj,
    null,
    customErrorMessages,
  );
}
