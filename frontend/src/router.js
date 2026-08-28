// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import CocktailList from '@/components/cocktails/list.vue';
import CocktailNew from '@/components/cocktails/new.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
