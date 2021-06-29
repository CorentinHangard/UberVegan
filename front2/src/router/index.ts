import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Inscription from "../views/authentification/Inscription.vue";
import InscriptionLivreur from "../views/authentification/InscriptionLivreur.vue";
import InscriptionRestaurateur from "../views/authentification/InscriptionRestaurateur.vue";
import Connexion from "../views/authentification/Connexion.vue";
import Livraison from "../views/livreur/livraison.vue";
import mesLivraisons from "../views/livreur/mesLivraisons.vue";
import Restaurant from "../views/restaurant/Restaurant.vue";
import Menu from "../views/restaurant/Menu.vue";
import MenuCreate from "../views/restaurant/MenuCreate.vue";
import ArticleCreate from "../views/restaurant/ArticleCreate.vue";

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
  {
    path: "/restaurant/:id",
    name: "restaurant",
    component: Restaurant,
    props: true,
  },
  {
    path: "/menu/:id",
    name: "menu",
    component: Menu,
    props: true,
  },
  {
    path: "/restaurant/menu/create/:id",
    name: "menuCreate",
    component: MenuCreate,
    props: true,
  },
  {
    path: "/restaurant/article/create",
    name: "articleCreate",
    component: ArticleCreate,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
