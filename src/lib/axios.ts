import Axios from "axios";

const env = process.env.NODE_ENV;

export const axios = Axios.create({
  baseURL:
    env === "development" ? "http://localhost:4000" : "http://13.231.5.6:4000",
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
