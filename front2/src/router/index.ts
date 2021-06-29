import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Inscription from "../views/authentification/Inscription.vue";
import InscriptionLivreur from "../views/authentification/InscriptionLivreur.vue";
import InscriptionRestaurateur from "../views/authentification/InscriptionRestaurateur.vue";
import Connexion from "../views/authentification/Connexion.vue";
import Livraison from "../views/livreur/livraison.vue";
import devenirRestaurateur from "../views/authentification/devenirRestaurateur.vue";
import mesLivraisons from "../views/livreur/mesLivraisons.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Connexion,
  },
  {
    path: "/signup",
    name: "signup",
    component: Inscription,
  },
  {
    path: "/signup/livreur",
    name: "signupLivreur",
    component: InscriptionLivreur,
  },
  {
    path: "/signup/restaurateur",
    name: "signupRestaurateur",
    component: InscriptionRestaurateur,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/livreur/livraison",
    name: "livraison",
    component: Livraison,
  },
  {
    path: "/livreur/mesLivraisons",
    name: "mesLivraisons",
    component: mesLivraisons,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
