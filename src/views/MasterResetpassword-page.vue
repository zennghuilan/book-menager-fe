<template>
  <div class="masterresetpassword-page">
    <MasterLogin v-if="currentForm === 'login'" />
    <Resetpassword v-else :switch-to-login="switchToLogin" :on-submit="handleResetpassword" />
  </div>

  <a-form-item>
  <a @click="switchToLogin">已重置密码？点击登录</a>
  </a-form-item>
</template>

<script setup>
import { ref } from 'vue'
import Resetpassword from '@/components/ResetPassword.vue'
import router from '@/router'

const currentForm = ref('reset') //初始量

const handleResetpassword = (formData) => {
  console.log('重置数据:', formData)
}

// 从重置密码切换到登录
const switchToLogin = () => {
    router.push('/auth')
}
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
