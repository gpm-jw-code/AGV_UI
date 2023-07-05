import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Admin from '../views/Admin.vue'

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
    path:'/admin',
    name:'admin',
    component:Admin,
    children:[
      {
        path:'controller',
        name:'controller',
        component: ()=>import('../components/Admin/Controller.vue')
      }
    ]
  }
  {
    path: '/idle',
    name: 'idle',
    component:()=> import('../views/IdleView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
