import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/landing-page/Home.vue';
import MaintainerCreatorView from '@/views/MaintainerCreatorView.vue';
import GenerationView from '@/views/document-generation/GenerationView.vue';
import GenerationHello from '@/views/document-generation/GenerationHello.vue';
import GenerationSelectDocument from '@/views/document-generation/GenerationSelectDocument.vue';
import GenerationPrint from "@/views/document-generation/GenerationPrint.vue";

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
    path: '/drukuj/:data',
    name: 'client:print',
    component: GenerationPrint,
    props: true,
  },
  {
    path: '/dokument',
    name: 'client:creator',
    component: GenerationView,
    children: [
      {
        path: '/info',
        name: 'client:creator:into',
        component: GenerationHello,
      },
      {
        path: '/select-document',
        name: 'client:creator:select',
        component: GenerationSelectDocument,
      },
    ],
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
