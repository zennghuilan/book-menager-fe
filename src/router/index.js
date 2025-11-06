// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import OptionPage from '@/views/Option-page.vue'
import BorrowBook from '@/components/BorrowBook.vue';
import ReturnBook from '@/components/ReturnBook.vue';
import SearchPage from '@/views/Search-page.vue';
import AuthPage from '@/views/Auth-page(Login).vue'
import AuthPageMasterLogin from '@/views/Auth-page(masterLogin).vue';
import ReaderRegisterPage from '@/views/ReaderRegister-page.vue';
import ReaderResetpasswordPage from '@/views/ReaderResetpassword-page.vue';
import MasterRegister from '@/components/MasterRegister.vue';
import MasterResetPassword from '@/views/MasterResetpassword-page.vue'
import Addbook from '@/components/AddBook.vue';
import ReduceBook from '@/components/ReduceBook.vue';
import ReaderHome from '@/views/ReaderHome.vue';

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
    component: OptionPage//在成功登陆之后读者对用户的功能的选择界面 虽然对美观还是不满意；
  },
    {
    path: '/borrow',
    name: 'BorrowBook',
    component: BorrowBook//读者的借书
  },
  {
    path: '/return',
    name: 'Return',
    component: ReturnBook//读者的还书
  },

  {
    path: '/search',
    name: 'Search',
    component: SearchPage//搜索的页面 要实现在搜索后就可以拿到对应的图书的信息卡片
  },
  {
    path: '/add',
    name: 'Add',
    component: Addbook//图书管理员的书籍添加
  },
  {
    path: '/reduce',
    name: 'Reduce',
    component: ReduceBook//图书管理员的书籍减少
  },
    {
    path: '/readerhome',
    name: 'Readerhome',
    component: ReaderHome//读者的个人主页 查看借阅的书籍信息 和 个人信息
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
