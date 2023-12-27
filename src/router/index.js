import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SingUp from "../views/SingUp.vue"
import LogIn from "../views/LogIn.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/singup',
    name: 'singup',
    component: SingUp
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
