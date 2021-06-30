import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Cart from "../views/Cart.vue";
import Command from "../views/Command.vue";
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
import Interdit from "../views/Interdit.vue";
import CommandHistory from "../views/client/CommandHistory.vue"
import roleMiddleware from '@/middleware/roleMiddleware';
import authMiddleware from '@/middleware/auth';
import clientParraine from '../views/client/Parrainage.vue'
import SuiviCommand from '../views/client/SuiviCommand.vue'

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
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/command/history",
    name: "commandHistory",
    component: CommandHistory,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/parrainage",
    name: "ParrainageClient",
    component: clientParraine,
    meta : {
      requireAuth : true,
      requireRole : true,
      role : 1
    }
  },
  {
    path: "/suivi/commandeClient",
    name: "SuiviCommandClient",
    component: SuiviCommand,
    meta : {
      requireAuth : true,
      requireRole : true,
      role : 1
    }
  },
  

  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/command/:id",
    name: "command",
    component: Command,
    props: true,
  },
  {
    path: "/livreur/livraison",
    name: "livraison",
    component: Livraison,
    meta: {
      requireRole: true,
      role: 2,
    },
  },
  {
    path: "/livreur/mesLivraisons",
    name: "mesLivraisons",
    component: mesLivraisons,
    meta: {
      requireRole: true,
      role: 2,
    },
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
    meta: {
      requireRole: true,
      role: 3,
    },
  },
  {
    path: "/restaurant/article/create",
    name: "articleCreate",
    component: ArticleCreate,
    props: true,
    meta: {
      requireRole: true,
      role: 3,
    },
  },
  {
    path: "/interdit",
    name: "interdit",
    component: Interdit,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(
      (record) => record.meta.requireRole && record.meta.role == 3
    )
  ) {
    if (roleMiddleware() != 3) {
      next({
        path: "/interdit",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (
    to.matched.some(
      (record) => record.meta.requireRole && record.meta.role == 2
    )
  ) {
    if (roleMiddleware() != 2) {
      next({
        path: "/interdit",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (
    to.matched.some(
      (record) => record.meta.requireRole && record.meta.role == 1
    )
  ) {
    if (roleMiddleware() != 1) {
      next({
        path: "/interdit",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requireAuth)) {
    if (authMiddleware() == false) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
