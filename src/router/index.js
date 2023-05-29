import {
  createRouter,
  createWebHashHistory,
  createMemoryHistory,
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/rd_test',
    name: 'rd_test',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/RDTestView.vue'),
  },
  {
    path: '/idle',
    name: 'idle',
    component:()=> import('../views/IdleView.vue')
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
