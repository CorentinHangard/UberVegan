import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5c931682 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _cfee518a = () => interopDefault(import('..\\pages\\interdit.vue' /* webpackChunkName: "pages/interdit" */))
const _c9fc52d8 = () => interopDefault(import('..\\pages\\monCompte.vue' /* webpackChunkName: "pages/monCompte" */))
const _6c9b7109 = () => interopDefault(import('..\\pages\\parrainerUtilisateur.vue' /* webpackChunkName: "pages/parrainerUtilisateur" */))
const _d1978d90 = () => interopDefault(import('..\\pages\\secret.vue' /* webpackChunkName: "pages/secret" */))
const _4d4f0ad4 = () => interopDefault(import('..\\pages\\authentification\\connexion.vue' /* webpackChunkName: "pages/authentification/connexion" */))
const _1d64fff6 = () => interopDefault(import('..\\pages\\authentification\\devenirLivreur.vue' /* webpackChunkName: "pages/authentification/devenirLivreur" */))
const _5915b94e = () => interopDefault(import('..\\pages\\authentification\\devenirRestaurateur.vue' /* webpackChunkName: "pages/authentification/devenirRestaurateur" */))
const _2cc766e5 = () => interopDefault(import('..\\pages\\authentification\\inscription.vue' /* webpackChunkName: "pages/authentification/inscription" */))
const _27489f60 = () => interopDefault(import('..\\pages\\livreur\\livraison.vue' /* webpackChunkName: "pages/livreur/livraison" */))
const _bfc850a4 = () => interopDefault(import('..\\pages\\livreur\\monCompteLivreur.vue' /* webpackChunkName: "pages/livreur/monCompteLivreur" */))
const _6e9980de = () => interopDefault(import('..\\pages\\livreur\\parrainageLivreur.vue' /* webpackChunkName: "pages/livreur/parrainageLivreur" */))
const _5fc8aa8e = () => interopDefault(import('..\\pages\\restaurateur\\article.vue' /* webpackChunkName: "pages/restaurateur/article" */))
const _7b4bc172 = () => interopDefault(import('..\\pages\\restaurateur\\commande.vue' /* webpackChunkName: "pages/restaurateur/commande" */))
const _5b95591c = () => interopDefault(import('..\\pages\\restaurateur\\compteRestaurateur.vue' /* webpackChunkName: "pages/restaurateur/compteRestaurateur" */))
const _242a5564 = () => interopDefault(import('..\\pages\\restaurateur\\historiqueCommande.vue' /* webpackChunkName: "pages/restaurateur/historiqueCommande" */))
const _0b11dba8 = () => interopDefault(import('..\\pages\\restaurateur\\menu.vue' /* webpackChunkName: "pages/restaurateur/menu" */))
const _4b5a1394 = () => interopDefault(import('..\\pages\\restaurateur\\monCompteRestaurateur.vue' /* webpackChunkName: "pages/restaurateur/monCompteRestaurateur" */))
const _9380b748 = () => interopDefault(import('..\\pages\\restaurateur\\parrainageRestaurateur.vue' /* webpackChunkName: "pages/restaurateur/parrainageRestaurateur" */))
const _62163f84 = () => interopDefault(import('..\\pages\\restaurateur\\suiviLivraison.vue' /* webpackChunkName: "pages/restaurateur/suiviLivraison" */))
const _c4ab570c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/interdit",
    component: _736d4528,
    name: "interdit"
  }, {
    path: "/monCompte",
    component: _c9fc52d8,
    name: "monCompte"
  }, {
    path: "/parrainerUtilisateur",
    component: _29dd3914,
    name: "parrainerUtilisateur"
  }, {
    path: "/secret",
    component: _12c53e65,
    name: "secret"
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
    path: "/livreur/monCompteLivreur",
    component: _bfc850a4,
    name: "livreur-monCompteLivreur"
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
    path: "/restaurateur/monCompteRestaurateur",
    component: _4b5a1394,
    name: "restaurateur-monCompteRestaurateur"
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
