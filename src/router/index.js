// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '@/views/AuthPage.vue';
import OptionPage from '@/views/Option-page.vue'
import BorrowBook from '@/components/BorrowBook.vue';
import RuturnBook from '@/components/RuturnBook.vue';
import SearchPage from '@/views/Search-page.vue';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage
  },
  {
    path: '/option',
    name: 'Option',
    component: OptionPage
  },
    {
    path: '/borrowbook',
    name: 'BorrowBook',
    component: BorrowBook
  },
  {
    path: '/ruturn',
    name: 'Ruturn',
    component: RuturnBook
  },

  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
