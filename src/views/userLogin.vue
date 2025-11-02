<template>
  <div class="login-page">
    <h1>用户登录</h1>
    <UserLogin />
  </div>
</template>

<script setup>
import UserLogin from '@/components/UserLogin.vue'
</script>

<style scoped>
.login-page {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}
</style>
