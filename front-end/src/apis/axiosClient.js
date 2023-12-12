import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://35.213.179.183:6807/api",
});

export default axiosClient;
