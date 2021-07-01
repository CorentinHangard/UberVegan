import Vue from "vue";
import Vuex, { Store } from "vuex";

import createPersitedState from "vuex-persistedstate";

import authStore from "./auth";
import userStore from "./user";
import deliveryStore from "./delivery";
import restaurantStore from "./restaurant";
import commandStore from "./command";
import docsStore from "./docs";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authStore,
    userStore,
    deliveryStore,
    restaurantStore,
    commandStore,
    docsStore,
  },
  plugins: [
    createPersitedState({
      paths: ["authStore", "userStore", "deliveryStore", "commandStore"],
      storage: window.sessionStorage,
    }),
  ],
});
