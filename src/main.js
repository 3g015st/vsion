import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Antd from 'ant-design-vue';
import router from './router/router';

import './styles/index.css';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Antd);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
