import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/room',
    name: 'Room',
    component: () => import('../views/Room.vue'),
    children: [
      { path: '', component: () => import('../views/Room.vue') },
      { path: ':id', component: () => import('../views/Room.vue') },
    ],
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: () => import('../views/Lobby.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.state.user.username ? true : false;
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' })
  }
  else {
    next()
  }
})

export default router
