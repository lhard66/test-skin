import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'desktop',
    component: () => import('@/views/home')
  }, {
    path: '/page',
    name: 'page',
    component: () => import('@/views/page')
  }]
})

export default router
