import 'prismjs'
import 'prismjs/themes/prism.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: () => import('./pages/Home.vue'),
      name: 'home',
      path: '/',
    },
    {
      component: () => import('./pages/Cube.vue'),
      name: 'cube',
      path: '/cube',
    },
    {
      component: () => import('./pages/Dodecaminx.vue'),
      name: 'dodecaminx',
      path: '/dodecaminx',
    },
  ],
})

createApp(App)
  .use(router)
  .mount('#app')
