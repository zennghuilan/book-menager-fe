<template>
  <a-form
    :model="formState"
    name="login"
    class="login-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="图书管理员id"
      name="librarianid"
      :rules="[{ required: true, message: '请输入图书管理员id' }]"
    >
      <a-input v-model:value="formState.librarianid" placeholder="请输入图书管理员id" />
    </a-form-item>
    <a-form-item
      label="密码"
      name="password"
      :rules="[
        { required: true, message: '请输入密码' },
        { min: 6, message: '密码至少6位' },
      ]"
    >
      <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
    </a-form-item>

    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="disabled"
        class="login-form-button"
        @click="handleLoginClick"
      >
        登录
      </a-button>
    </a-form-item>

    <a-form-item>
      <a @click="goToRegister">没有账号？点击申请</a>
    </a-form-item>

    <a-form-item>
      <a @click="goToResetPassword">忘记密码？</a>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, computed } from 'vue'
import librarianRegisterService from '@/service/librarianregister'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToRegister = () => {
  router.push('/librarianregister')
}

const goToResetPassword = () => {
  router.push('/librarianresetpassword')
}

const handleLoginClick = () => {
  router.push('/librarianoption')
}
const formState = reactive({
  librarianid: '',
  password: '',
})

const disabled = computed(() => {
  return !(formState.librarianid && formState.password)
})

const onFinish = async (values) => {
  console.log('登录表单数据:', values)
  // 调用登录服务
  const response = await librarianRegisterService(values.librarianid, values.password)
  // 检查token
  if (response.token) {
    //保存 token 到 localStorage
    localStorage.setItem('token', response.token)
    //直接跳转到主页面
    router.push('/librarianoption')
  }
}
</script>

<style scoped>
.login-form {
  width: 75%;
}

.login-form-button {
  width: 100%;
}
</style>
