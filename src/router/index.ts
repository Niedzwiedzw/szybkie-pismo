import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/landing-page/Home.vue';
import MaintainerCreatorView from '@/views/MaintainerCreatorView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/tworzenie-dokumentu',
    name: 'maintainer:creator',
    component: MaintainerCreatorView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
