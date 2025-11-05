<template>
<div class="readerregister-page">
    <ReaderLogin v-if="currentForm === 'login'" />
    <ReaderRegister
    v-else
    :switch-to-login="switchToLogin"
    :on-submit="handleRegister"
    />
</div>
</template>

<script setup>
import { ref } from 'vue';
import ReaderLogin from '@/components/ReaderLogin.vue';
import ReaderRegister from '@/components/ReaderRegister.vue';

const currentForm = ref('register'); // 默认显示注册页面

const handleRegister = (formData) => {
    console.log('注册数据:', formData);
};

// 从注册切换到登录
const switchToLogin = () => {
    currentForm.value = 'login';
};
</script>


<style scoped>
.readerregister-page {
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
