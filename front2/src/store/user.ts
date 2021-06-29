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
  },
  actions: {
    profile: async ({ commit, dispatch }) => {
      const response = await AuthService.profile();
      commit("SET_USER", response.data);
    },
    profileEdit: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.profileEdit(infos);
      console.log(response.data);
    },
  },
};

export default userStore;
