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
    RESET_DELIVERY: (state) => {
      state.delivery = {};
    },
  },
  actions: {
    delivery: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.delivery(infos);
      commit("SET_DELIVERY", response.data[0]);
    },
    deliveryReset: async ({ commit, dispatch }) => {
      commit("RESET_DELIVERY");
    },
    deliveryByOrder: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.deliveryByOrder(infos);
      commit("SET_DELIVERY", response.data[0]);
    },
    deliveries: async ({ commit, dispatch }) => {
      const response = await AuthService.deliveries();
      commit("SET_DELIVERIES", response.data);
    },
    deliveryAccept: async ({ commit, dispatch }, { infos }) => {
      await AuthService.deliveryAccept(infos);
    },
    deliveryRefuse: async ({ commit, dispatch }, { infos }) => {
      await AuthService.deliveryRefuse(infos);
    },
    deliveryTake: async ({ commit, dispatch }, { infos }) => {
      await AuthService.deliveryTake(infos);
    },
    deliveryDelivered: async ({ commit, dispatch }, { infos }) => {
      await AuthService.deliveryDelivered(infos);
    },
  },
};

export default deliveryStore;
