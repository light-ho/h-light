import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://power.larc.nasa.gov/",
});

export default apiInstance;