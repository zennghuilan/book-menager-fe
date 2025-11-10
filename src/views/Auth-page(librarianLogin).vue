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
import librarianlogin from '@/service/librarianlogin'  // 修正导入
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()

const goToRegister = () => {
  router.push('/librarianregister')
}

const goToResetPassword = () => {
  router.push('/librarianresetpassword')
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
  try {
    // 使用正确的函数名和参数名
    const response = await librarianlogin(values.librarianid, values.password)
    if (response && response.token) {
      //保存 token 到 localStorage
      localStorage.setItem('token', response.token)
      message.success('登录成功！')
      //跳转到主页面
      router.push('/librarianoption')
    } else {
      message.error('登录失败：请检查你的账号密码')
    }
  } catch (error) {
    console.error('登录出错:', error)
    message.error('登录失败，请检查图书管理员证号和密码')
  }
}

const onFinishFailed = (errorInfo) => {
  console.log('登录失败:', errorInfo)
  message.error('请正确填写账号和密码')
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
