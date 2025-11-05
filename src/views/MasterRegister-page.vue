<template>
<div class="masterregister-page">
    <MasterLogin v-if="currentForm === 'login'" />
    <MasterRegister
    v-else
    :switch-to-login="switchToLogin"
    :on-submit="handleRegister"
    />
</div>
</template>

<script setup>
import { ref } from 'vue';
import MasterLogin from '@/components/MasterLogin.vue';
import MasterRegister from '@/components/MasterRegister.vue';

const currentForm = ref('reset'); // 默认显示重置密码页面

const handleRegister = (formData) => {
    console.log('注册数据:', formData);
};

// 从注册切换到登录
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
