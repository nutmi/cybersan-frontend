import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SingUp from "../views/SingUp.vue"
import LogIn from "../views/LogIn.vue"
import ChatDetail from '../views/ChatDetail.vue'
import AboutMe from '../views/aboutMe.vue'


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
  {
    path: '/chat/:id',
    name: 'chat',
    component: ChatDetail
  },
  {
    path: '/me',
    name: 'me',
    component: AboutMe
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
