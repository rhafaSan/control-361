import axios from "axios";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
});

export default axiosClient;
