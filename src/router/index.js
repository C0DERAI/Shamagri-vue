import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store, ssrContext } ) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
      if (store.getters['auth/isAuthenticated']) {
        
        next()
      } else {
        console.log(store.getters['auth/isAuthenticated'])
        next('/login')
      }
    } 
    else if (to.matched.some(record => record.meta.alreadyAuth)){
      if (store.getters['auth/isAuthenticated']) {

        next('/landing-page')
      } else {
        console.log(store.getters['auth/isAuthenticated'])
        next()
      }
    }
    else {
      next()
    }
  })
  return Router
}
