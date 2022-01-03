import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'signin',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import('../views/Profil.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('../views/Post.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
