import VueRouter from 'vue-router';
import defaultRoutes from './default-routes';

const router = new VueRouter({
  routes: defaultRoutes,
  mode: 'hash'
});

export default router;
