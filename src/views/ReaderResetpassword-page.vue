<template>
  <div class="readerresetpassword-page">
    <ReaderLogin v-if="currentForm === 'login'" />
    <Resetpassword v-else :switch-to-login="switchToLogin" :on-submit="handleResetpassword" />
    <a-form-item>
      <a @click="switchToLogin">已重置密码？点击登录</a>
    </a-form-item>
  </div>
</template>
//在在这里好像就是只有登录的接口不一样 能不能实现合并捏
<script setup>
import { ref } from 'vue'
import Resetpassword from '@/components/ResetPassword.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentForm = ref('reset') //初始量

const handleResetpassword = (formData) => {
  console.log('重置数据:', formData)
}

const switchToLogin = () => {
  router.push('/auth')
}
</script>

<style scoped>
.masterresetpassword-page {
  width: 75%;
}
</style>
