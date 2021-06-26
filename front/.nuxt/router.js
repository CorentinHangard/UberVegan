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
