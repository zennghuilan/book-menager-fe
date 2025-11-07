<template>
  <a-flex vertical class="readerregister-page">
    <ReaderLogin v-if="currentForm === 'login'" />
    <ReaderRegister
      v-else
      :switch-to-login="switchToLogin"
      :on-submit="handleRegister"
    />
    <a-form-item>
      <a @click="goToLogin">已有账号？点击登录</a>
    </a-form-item>
  </a-flex>
</template>

<script setup>
import { ref } from 'vue';
import ReaderLogin from '@/components/ReaderRegister.vue';
import ReaderRegister from '@/components/ReaderRegister.vue';
import { useRouter } from 'vue-router'


const router = useRouter()

const currentForm = ref('register'); // 默认显示注册页面

const handleRegister = (formData) => {
    console.log('注册数据:', formData);
};

// 从注册切换到登录
const goToLogin = () => {
    router.push('/auth')
}
</script>


<style scoped>
.readerregister-page {
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
