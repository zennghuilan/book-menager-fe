// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import OptionPage from '@/views/Option-page.vue'
import BorrowBook from '@/components/BorrowBook.vue';
import RuturnBook from '@/components/RuturnBook.vue';
import SearchPage from '@/views/Search-page.vue';
import AuthPage from '@/views/Auth-page(Login).vue'
import AuthPageMasterLogin from '@/views/Auth-page(masterLogin).vue';
import ReaderRegisterPage from '@/views/ReaderRegister-page.vue';
import ReaderResetpasswordPage from '@/views/ReaderResetpassword-page.vue';
import MasterRegister from '@/components/MasterRegister.vue';
import MasterResetPassword from '@/views/MasterResetpassword-page.vue'


const routes = [
  {
    path: '/',
    redirect: '/auth' // 默认跳转到登录页
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage//读者在登录时的页面 也就是主页
  },
  {
    path: '/authmaster',
    name: 'AuthMaster',
    component: AuthPageMasterLogin//图书管理员的登陆界面 主页
  },
  {
    path: '/readerregister',
    name: 'Register',
    component: ReaderRegisterPage//读者的注册页面
  },
  {
    path: '/readerreset-password',
    name: 'ResetPassword',
    component: ReaderResetpasswordPage//读者的重置密码页面
  },
  {
    path: '/masterregister',
    name: 'MasterRegister',
    component:MasterRegister//图书管理员的注册页面
  },
  {
    path: '/masterresetpassword',
    name: 'MasterResetPassword',
    component: MasterResetPassword//图书管理员的重置密码页面
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
