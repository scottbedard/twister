import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import './assets/tailwind.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/cube',
    },
    {
      component: () => import('@/routes/Cube.vue'),
      name: 'cube',
      path: '/cube',
    },
    {
      component: () => import('@/routes/Dodecaminx.vue'),
      name: 'dodecaminx',
      path: '/dodecaminx',
    },
    {
      path: '*',
      component: () => import('@/routes/404.vue'),
    },
  ],
});

// @ts-ignore
window.app = new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
