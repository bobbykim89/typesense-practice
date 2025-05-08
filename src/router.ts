import { createRouter, createWebHistory } from 'vue-router'
import About from './views/About.vue'
import EmbeddedSearch from './views/EmbeddedSearch.vue'
import Home from './views/Home.vue'
import ProgramSearch from './views/ProgramSearch.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/program-search',
      name: 'Program Search',
      component: ProgramSearch,
    },
    {
      path: '/embedded-search',
      name: 'Embedded Search',
      component: EmbeddedSearch,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
  ],
})

export default router
