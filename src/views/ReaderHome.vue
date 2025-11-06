<template>
  <div class="readerhome-page">
    <AuthPageLogin v-if="currentForm === 'login'" />
    <ReaderIntroduction v-else :switch-to-login="switchToLogin" :on-submit="returnLogin" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AuthPageLogin from './Auth-page(Login).vue'
import ReaderIntroduction from '@/components/ReaderIntroduction.vue'

const currentForm = ref('reset') //初始量

const returnLogin = (formData) => {
  console.log('返回首页:', formData)
}
const switchToLogin = () => {
  currentForm.value = 'login'
}
</script>

<style scoped>
.readerhome-page {
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
