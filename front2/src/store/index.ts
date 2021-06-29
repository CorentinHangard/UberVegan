import Vue from "vue";
import Vuex, { Store } from "vuex";

import createPersitedState from "vuex-persistedstate";

import authStore from "./auth";
import userStore from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authStore,
    userStore,
  },
  plugins: [
    createPersitedState({
      paths: ["authStore"],
      storage: window.sessionStorage,
    }),
  ],
});
