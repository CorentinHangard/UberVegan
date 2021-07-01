import { Module } from "vuex";
import AuthService from "@/services/auth.service";
import jwt from "jsonwebtoken";

const getState = () => {
  return {
    token: "",
    infos: {},
  };
};

const docsStore: Module<any, any> = {
  state: getState(),
  getters: {},
  mutations: {},
  actions: {
    users: async ({ commit, dispatch }) => {
      const response = await AuthService.users();
      console.log(response.data);
      commit("SET_USERS_DOC", response.data);
    },
  },
};

export default docsStore;
