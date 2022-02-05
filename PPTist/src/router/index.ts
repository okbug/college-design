import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'

const routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/:id',
    component: Index,
    props: true,
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})