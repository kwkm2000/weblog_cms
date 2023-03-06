import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost:4000",
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
