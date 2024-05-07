import axios from "axios";

import { getToken } from "@/utils";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL === "http://server:1337/api"
      ? "http://localhost:1337/api"
      : process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
