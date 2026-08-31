// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import CocktailList from '@/components/cocktails/list.vue';
import CocktailNew from '@/components/cocktails/new.vue';
import CocktailDetail from '@/components/cocktails/detail.vue';
import ApiDocs from '@/components/docs.vue';

const routes = [
  {
    path: '/',
    name: 'cocktail_list',
    component: CocktailList,
  },
  {
    path: '/cocktails/new',
    name: 'cocktail_new',
    component: CocktailNew,
  },
  {
    path: '/cocktails/:id',
    name: 'cocktail_detail',
    component: CocktailDetail,
  },
  {
    path: '/docs',
    name: 'docs',
    component: ApiDocs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
