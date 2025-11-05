<template>
  <a-form
    :model="formState"
    name="login"
    class="login-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="读者证号"
      name="readerid"
      :rules="[{ required: true, message: '请输入读者证号' }]"
    >
      <a-input
        v-model:value="formState.readerid"
        placeholder="请输入读者证号"
      />
    </a-form-item>
    <a-form-item
      label="密码"
      name="password"
      :rules="[
        { required: true, message: '请输入密码' },
        { min: 6, message: '密码至少6位' }
      ]"
    >
      <a-input-password
        v-model:value="formState.password"
        placeholder="请输入密码"
      />
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
      <a @click="goToRegister">没有账号？点击注册</a>
    </a-form-item>

    <a-form-item>
      <a @click="goToResetPassword">忘记密码？</a>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, computed } from 'vue';
import UserRegisterService from '../service/register'


import { useRouter } from 'vue-router'

const router = useRouter()

const goToRegister = () => {
    router.push('/readerregister')
}

const goToResetPassword = () => {
    router.push('/readerreset-password')
}

const handleLoginClick = () => {
    router.push('/option')
}

const formState = reactive({
  readerid: '',
  password: ''
});

const disabled = computed(() => {
  return !(formState.readerid && formState.password);
});

const onFinish = (values) => {
  console.log(values)
  UserRegisterService(values).then(res => {
    if (res.status === 200) {
      window.location.href = "/"
    }
  })
};
const onFinishFailed = (errorInfo) => {
  console.log('登录失败:', errorInfo);
};
</script>

<style scoped>
.login-form {
  width:75%;
}

.login-form-button {
  width: 100%;
}
</style>
