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
  async restaurant(infos: any) {
    return await axios.get("ms-users/restaurant?id=" + infos.id);
  },
  async restaurants() {
    return await axios.get("ms-users/restaurants");
  },
  async menu(infos: any) {
    return await axios.get("ms-products/menu?id=" + infos.id);
  },
  async menus(infos: any) {
    return await axios.get("ms-products/menus?id=" + infos.id);
  },
  async menuCreate(infos: any) {
    return await axios.post("ms-products/menu/create", infos);
  },
  async article(infos: any) {
    return await axios.get("ms-products/article?id=" + infos.id);
  },
  async articles(infos: any) {
    return await axios.get("ms-products/articles?id=" + infos.id);
  },
  async articleCreate(infos: any) {
    return await axios.post("ms-products/article/create", infos);
  },
};
