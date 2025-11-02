import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/userLogin.vue'
import UserRegister from '@/components/UserRegister.vue'
import ResetPassword from '@/components/ResetPassword.vue'
import BorrowBook from '../components/BorrowBook.vue'
import RuturnBook from '@/components/RuturnBook.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: UserRegister,
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/borrow-book',
    name: 'BorrowBook',
    component: BorrowBook,
  },
  {
    path: '/return-book',
    name: 'RuturnBook',
    component: RuturnBook,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
