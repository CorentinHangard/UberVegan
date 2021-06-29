import axios from "./api";

export default {
  async authenticate(infos: any) {
    return await axios.post("ms-users/authenticate", infos);
  },
  async profile() {
    return await axios.get("ms-users/");
  },
  async profileEdit(infos: any) {
    return await axios.put("ms-users/edit", infos);
  },
  async profileCreate(infos: any) {
    return await axios.post("ms-users/create", infos);
  },
};
