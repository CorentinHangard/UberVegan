import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Cart from "../views/Cart.vue";
import Command from "../views/Command.vue";
import CommandRestaurant from "../views/CommandRestaurant.vue";
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
import ArticleEdit from "../views/restaurant/ArticleEdit.vue";
import Interdit from "../views/Interdit.vue";
import Status from "../views/Status.vue";
import CommandHistory from "../views/client/CommandHistory.vue";
import roleMiddleware from "@/middleware/roleMiddleware";
import statusMiddleware from "@/middleware/statusMiddleware";
import authMiddleware from "@/middleware/auth";
import clientParraine from "../views/client/Parrainage.vue";
import restaurateurParraine from "../views/restaurateur/parrainageRestaurateur.vue";
import SuiviCommand from "../views/client/SuiviCommand.vue";
import Developpeur from "../views/developpeur/Developpeur.vue";
import CGU from "../views/CGU.vue";
import politique from "../views/politique.vue";
import contact from "../views/contact.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/CGU",
    name: "CGU",
    component: CGU,
  },
  {
    path: "/politique",
    name: "politique",
    component: politique,
  },
  {
    path: "/contact",
    name: "contact",
    component: contact,
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
      requireStatus: true,
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
    meta: {
      requireAuth: true,
      requireRole: true,
      role: 1,
    },
  },
  {
    path: "/suivi/commandeClient",
    name: "SuiviCommandClient",
    component: SuiviCommand,
    meta: {
      requireAuth: true,
      requireRole: true,
      role: 1,
    },
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
    path: "/command/restaurant/:id",
    name: "commandRestaurant",
    component: CommandRestaurant,
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
    path: "/restaurant/article/edit/:id",
    name: "articleEdit",
    component: ArticleEdit,
    props: true,
    meta: {
      requireRole: true,
      role: 3,
    },
  },
  {
    path: "/restaurant/parrainage",
    name: "ParrainageRestaurateur",
    component: restaurateurParraine,
    meta: {
      requireAuth: true,
      requireRole: true,
      role: 3,
    },
  },
  {
    path: "/developpeur",
    name: "developpeur",
    component: Developpeur,
    props: true,
    meta: {
      requireRole: true,
      role: 4,
    },
  },

  {
    path: "/interdit",
    name: "interdit",
    component: Interdit,
  },
  {
    path: "/status",
    name: "status",
    component: Status,
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
  if (to.matched.some((record) => record.meta.requireStatus)) {
    if (statusMiddleware() != 0) {
      next({
        path: "/status",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  }
});

export default router;
