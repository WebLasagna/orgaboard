import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Error404 from './views/Error404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/conditions',
    name: 'conditions',
    alias: '/agb',
    component: () =>
      import(/* webpackChunkName: "legal" */ './views/Legal/Conditions')
  },
  {
    path: '/confidentialité',
    alias: ['/privacy', '/datenschutz'],
    name: 'privacy',
    component: () =>
      import(/* webpackChunkName: "legal" */ './views/Legal/Privacy')
  },
  {
    path: '*',
    name: 'error404',
    component: Error404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
