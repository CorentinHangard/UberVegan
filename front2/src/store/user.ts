import { Module } from "vuex";
import AuthService from "@/services/auth.service";

const getState = () => {
  return {
    user: {},
    cart: [],
  };
};

const userStore: Module<any, any> = {
  state: getState(),
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getCart: (state) => {
      return state.cart;
    },
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_CART: (state, cart) => {
      const t = state.cart.filter((c) => c.id === cart.id);
      if (t.length !== 0) {
        state.cart.find((e) => e.id === t[0].id).count++;
      } else {
        state.cart.push(cart);
      }
    },
    // REMOVE_CART_ITEM: (state, cart) => {
    //   state.cart.filter((item) => item !== nbr);
    // },
    RESET_CART: (state) => {
      state.cart = [];
    },
    RESET_USER: (state) => {
      Object.assign(state, getState());
    },
  },
  actions: {
    cart: async ({ commit, dispatch }, { infos }) => {
      commit("SET_CART", infos);
    },
    removeCartItem: async ({ commit, dispatch }, { infos }) => {
      commit("SET_CART", infos);
    },
    resetCart: async ({ commit, dispatch }) => {
      commit("RESET_CART");
    },
    profile: async ({ commit, dispatch }) => {
      const response = await AuthService.profile();
      commit("SET_USER", response.data);
    },
    profileEdit: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.profileEdit(infos);
    },
  },
};

export default userStore;
