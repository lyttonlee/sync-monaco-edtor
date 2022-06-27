import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/file/:fileName',
      component: () => import('@/views/file.vue')
    }
  ]
})

export default router

