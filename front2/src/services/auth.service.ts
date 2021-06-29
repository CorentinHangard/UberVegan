import axios from "./api";

export default {
  async authenticate(infos: any) {
    return await axios.post("ms-users/authenticate", infos);
  }
};
