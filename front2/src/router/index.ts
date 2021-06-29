import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Connexion from "../views/authentification/Connexion.vue";
import Inscription from "../views/authentification/inscription.vue";
import devenirLivreur from "../views/authentification/devenirLivreur.vue";
import devenirRestaurateur from "../views/authentification/devenirRestaurateur.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    component: Connexion,
  },
  {
    path: "/inscription",
    component: Inscription,
  },
  {
    path: "/devenirLivreur",
    component: devenirLivreur,
  },
  {
    path: "/devenirRestaurateur",
    component: devenirRestaurateur,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
