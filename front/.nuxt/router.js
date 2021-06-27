import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5322b6f5 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _348e6389 = () => interopDefault(import('..\\pages\\authentification\\connexion.vue' /* webpackChunkName: "pages/authentification/connexion" */))
const _5b9b921c = () => interopDefault(import('..\\pages\\authentification\\devenirLivreur.vue' /* webpackChunkName: "pages/authentification/devenirLivreur" */))
const _077eb88c = () => interopDefault(import('..\\pages\\authentification\\devenirRestaurateur.vue' /* webpackChunkName: "pages/authentification/devenirRestaurateur" */))
const _dbb241d0 = () => interopDefault(import('..\\pages\\authentification\\inscription.vue' /* webpackChunkName: "pages/authentification/inscription" */))
const _129559fd = () => interopDefault(import('..\\pages\\livreur\\livraison.vue' /* webpackChunkName: "pages/livreur/livraison" */))
const _a94da4ea = () => interopDefault(import('..\\pages\\livreur\\parrainageLivreur.vue' /* webpackChunkName: "pages/livreur/parrainageLivreur" */))
const _206405ec = () => interopDefault(import('..\\pages\\restaurateur\\article.vue' /* webpackChunkName: "pages/restaurateur/article" */))
const _7b1d2a74 = () => interopDefault(import('..\\pages\\restaurateur\\commande.vue' /* webpackChunkName: "pages/restaurateur/commande" */))
const _99cbeb42 = () => interopDefault(import('..\\pages\\restaurateur\\compteRestaurateur.vue' /* webpackChunkName: "pages/restaurateur/compteRestaurateur" */))
const _050f0c51 = () => interopDefault(import('..\\pages\\restaurateur\\historiqueCommande.vue' /* webpackChunkName: "pages/restaurateur/historiqueCommande" */))
const _20b0bbd9 = () => interopDefault(import('..\\pages\\restaurateur\\menu.vue' /* webpackChunkName: "pages/restaurateur/menu" */))
const _d235c66e = () => interopDefault(import('..\\pages\\restaurateur\\parrainageRestaurateur.vue' /* webpackChunkName: "pages/restaurateur/parrainageRestaurateur" */))
const _6d9d74f1 = () => interopDefault(import('..\\pages\\restaurateur\\suiviLivraison.vue' /* webpackChunkName: "pages/restaurateur/suiviLivraison" */))
const _070514a6 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _5322b6f5,
    name: "inspire"
  }, {
    path: "/authentification/connexion",
    component: _348e6389,
    name: "authentification-connexion"
  }, {
    path: "/authentification/devenirLivreur",
    component: _5b9b921c,
    name: "authentification-devenirLivreur"
  }, {
    path: "/authentification/devenirRestaurateur",
    component: _077eb88c,
    name: "authentification-devenirRestaurateur"
  }, {
    path: "/authentification/inscription",
    component: _dbb241d0,
    name: "authentification-inscription"
  }, {
    path: "/livreur/livraison",
    component: _129559fd,
    name: "livreur-livraison"
  }, {
    path: "/livreur/parrainageLivreur",
    component: _a94da4ea,
    name: "livreur-parrainageLivreur"
  }, {
    path: "/restaurateur/article",
    component: _206405ec,
    name: "restaurateur-article"
  }, {
    path: "/restaurateur/commande",
    component: _7b1d2a74,
    name: "restaurateur-commande"
  }, {
    path: "/restaurateur/compteRestaurateur",
    component: _99cbeb42,
    name: "restaurateur-compteRestaurateur"
  }, {
    path: "/restaurateur/historiqueCommande",
    component: _050f0c51,
    name: "restaurateur-historiqueCommande"
  }, {
    path: "/restaurateur/menu",
    component: _20b0bbd9,
    name: "restaurateur-menu"
  }, {
    path: "/restaurateur/parrainageRestaurateur",
    component: _d235c66e,
    name: "restaurateur-parrainageRestaurateur"
  }, {
    path: "/restaurateur/suiviLivraison",
    component: _6d9d74f1,
    name: "restaurateur-suiviLivraison"
  }, {
    path: "/",
    component: _070514a6,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
