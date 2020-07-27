import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import './assets/tailwind.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  render: (h) => h(App),
  router: new VueRouter({ mode: 'history' }),
}).$mount('#app');
