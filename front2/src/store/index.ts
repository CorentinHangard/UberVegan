import Vue from "vue";
import Vuex, { Store } from "vuex";

import createPersitedState from "vuex-persistedstate";

import authStore from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authStore,
  },
  plugins: [
    createPersitedState({
      paths: ["authStore"],
      storage: window.sessionStorage,
    }),
  ],
});
