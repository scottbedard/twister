import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'cube',
      },
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
