import axios from "axios";

const api = axios.create({
  baseURL: "https://n4sof8k6r4.execute-api.ap-southeast-2.amazonaws.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
