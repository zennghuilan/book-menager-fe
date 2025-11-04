<template>
  <div class="auth-page">
    <MasterLogin
      v-if="currentForm === 'login'"
      :switch-to-register="switchToRegister"
      :switch-to-resetpassword="switchToResetPassword"
      :on-submit="handleLogin"
    />
    <ResetPassword
      v-if="currentForm === 'resetpassword'"
      :switch-to-login="switchToLogin"
      :on-submit="handleResetPassword"
    />
    <MasterRegister
      v-else
      :switch-to-login="switchToLogin"
      :on-submit="handleRegister"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MasterRegister from '@/components/MasterRegister.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import MasterLogin from '@/components/MasterLogin.vue';

const currentForm = ref('login');

const handleLogin = (formData) => {
  console.log('登录数据:', formData);
};

const handleRegister = (formData) => {
  console.log('注册数据:', formData);
};

const handleResetPassword = (formData) => {
  console.log('重置密码数据:', formData);
};


const switchToLogin = () => {
  currentForm.value = 'login';
};

const switchToRegister = () => {
  currentForm.value = 'register';
};
const switchToResetPassword = () => {
  currentForm.value = 'resetpassword';
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
