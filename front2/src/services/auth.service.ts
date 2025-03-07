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
  async delivery(infos: any) {
    return await axios.get("ms-deliveries/?id=" + infos.id);
  },
  async deliveryByOrder(infos: any) {
    return await axios.get("ms-deliveries/byorderid?id=" + infos.id);
  },
  async deliveries() {
    return await axios.get("ms-deliveries/all");
  },
  async deliveryAccept(infos: any) {
    return await axios.put("ms-deliveries/accept?id=" + infos.id);
  },
  async deliveryRefuse(infos: any) {
    return await axios.put("ms-deliveries/refuse?id=" + infos.id);
  },
  async deliveryTake(infos: any) {
    return await axios.put("ms-deliveries/take?id=" + infos.id);
  },
  async deliveryDelivered(infos: any) {
    return await axios.put("ms-deliveries/delivered?id=" + infos.id);
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
  async menuDelete(infos: any) {
    return await axios.delete("ms-products/menu/delete?id=" + infos.id);
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
  async articleEdit(infos: any) {
    return await axios.put("ms-products/article/edit", infos);
  },
  async command(infos: any) {
    return await axios.get("ms-commands/?id=" + infos.id);
  },
  async commands() {
    return await axios.get("ms-commands/history");
  },
  async commandsRestaurant() {
    return await axios.get("ms-commands/restaurant/history");
  },
  async commandCreate(infos: any) {
    return await axios.post("ms-commands/create", infos);
  },
  async commandPay(infos: any) {
    return await axios.put("ms-commands/pay", infos);
  },
  async commandValid(infos: any) {
    return await axios.put("ms-commands/valid", infos);
  },
  async statsCommand() {
    return await axios.get("ms-stats/menu");
  },
  async users() {
    return await axios.get("ms-users/doc");
  },
};
