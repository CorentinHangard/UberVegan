import store from "../store/index";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (config: any) => {
    if (store.getters.isConnected)
      config.headers.Authorization = "Bearer " + store.getters.getToken;
    return config;
  },
  (err: any) => console.log(err)
);

export default axios;
