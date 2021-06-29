import { Module } from "vuex";
import AuthService from "@/services/auth.service";
import jwt from "jsonwebtoken";

const getState = () => {
  return {
    token: "",
    infos: {},
  };
};

const authStore: Module<any, any> = {
  state: getState(),
  getters: {
    isConnected: (state) => {
      return state.token != "";
    },
    getToken: (state) => {
      return state.token;
    },
    getInfos: (state) => {
      return state.infos;
    },
  },
  mutations: {
    SET_TOKENS_INFOS: (state, data) => {
      state.token = data.token;
      state.infos = data.infos;
    },
    RESET: (state) => {
      Object.assign(state, getState());
    },
  },
  actions: {
    authenticate: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.authenticate(infos);
      const token = response.data.token;
      const data = {
        token: token,
        infos: jwt.decode(token),
      };
      commit("SET_TOKENS_INFOS", data);
    },
    logout: ({ commit, dispatch }) => {
      commit("RESET", "");
    },
  },
};

export default authStore;
