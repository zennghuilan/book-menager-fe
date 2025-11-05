<template>
  <div class="masterresetpassword-page">
    <MasterLogin  Login v-if="currentForm === 'login'" />
    <Resetpassword
      v-else
      :switch-to-login="switchToLogin"
      :on-submit="handleResetpassword"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Resetpassword from '@/components/ResetPassword.vue';
import MasterLogin from '@/components/MasterLogin.vue';

const currentForm = ref('login');

const handleResetpassword = (formData) => {
  console.log('重置数据:', formData);
};

const switchToLogin = () => {
  currentForm.value = 'login';
};
</script>

<style scoped>
.masterresetpassword-page {
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
