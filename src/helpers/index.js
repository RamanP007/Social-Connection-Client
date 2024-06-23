import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { ENV } from "./env";
import axios, { AxiosError } from "axios";

export const isUserLoggedIn = () => {
  return Boolean(Cookies.get("isUserLoggedIn"));
};

export const PrivateRoute = ({ children }) => {
  return isUserLoggedIn() ? children : <Navigate to="/login" />;
};

export const GetReq = async (_url) => {
  try {
    const url = `${ENV.DEV_URL}/${_url}`;
    const response = await axios.get(url, { withCredentials: true });
    if (response.status === 200 && response.data.success) {
      return { success: true, data: response.data?.data };
    } else {
      return { success: false, data: null, error: "Something went wrong" };
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 409) {
      return { success: false, data: error.response.data, error };
    }
    return { success: false, data: null, error };
  }
};

export const PostReq = async (_url, data) => {
  try {
    const url = `${ENV.DEV_URL}/${_url}`;
    const response = await axios.post(url, data, { withCredentials: true });
    if (response.status === 200 && response.data.success) {
      return { success: true, data: response.data?.data };
    } else {
      return { success: false, data: null, error: "Something went wrong" };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.response.data?.message || "Something Went Wrong",
    };
  }
};
