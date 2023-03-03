import Axios, { AxiosRequestConfig } from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost:4000",
});
