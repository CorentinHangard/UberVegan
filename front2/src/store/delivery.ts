import { Module } from "vuex";
import AuthService from "@/services/auth.service";

const getState = () => {
  return {
    delivery: {},
    deliveries: [],
  };
};

const deliveryStore: Module<any, any> = {
  state: getState(),
  getters: {
    getDelivery: (state) => {
      return state.delivery;
    },
    getDeliveries: (state) => {
      return state.deliveries;
    },
  },
  mutations: {
    SET_DELIVERY: (state, delivery) => {
      state.delivery = delivery;
    },
    SET_DELIVERIES: (state, deliveries) => {
      state.deliveries = deliveries;
    },
  },
  actions: {
    delivery: async ({ commit, dispatch }, { infos })  => {
      const response = await AuthService.delivery(infos);
      commit("SET_DELIVERY", response.data);
    },
    deliveries: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.deliveries(infos);
      commit("SET_DELIVERIES", response.data);
    },
  },
};

export default deliveryStore;
