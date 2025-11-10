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
import ReaderLogin from '@/components/ReaderLogin.vue'; // 修正导入路径
import ReaderRegister from '@/components/ReaderRegister.vue';
import { useRouter } from 'vue-router'
import readerregisterservice from '@/services/readerregisterservice'; // 导入service

const router = useRouter()

const currentForm = ref('register'); // 默认显示注册页面

const handleRegister = async (formData) => {
    console.log('注册数据:', formData);

    // 调用service发送注册请求
    const result = await readerregisterservice(
      formData.readername,
      formData.email,
      formData.code,
      formData.password
    );

    if (result) {
      // 注册成功处理
      console.log('注册成功', result);
      router.push('/auth'); // 跳转到登录页面
    } else {
      // 注册失败处理
      console.log('注册失败');
    }
};

// 从注册切换到登录
const goToLogin = () => {
    router.push('/auth')
}

// 添加switchToLogin函数
const switchToLogin = () => {
    currentForm.value = 'login';
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
