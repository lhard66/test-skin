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
    path: '/page1',
    name: 'page1',
    component: () => import('@/views/page1')
  }, {
    path: '/page2',
    name: 'page2',
    component: () => import('@/views/page2')
  }]
})

export default router
