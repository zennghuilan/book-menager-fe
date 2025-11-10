<template>
  <a-flex vertical class="readerrelogin-page">
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
        <a-input v-model:value="formState.readerid" placeholder="请输入读者证号" />
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
        <a @click="goToRegister">没有账号？点击注册</a>
      </a-form-item>

      <a-form-item>
        <a @click="goToResetPassword">忘记密码？</a>
      </a-form-item>
    </a-form>
  </a-flex>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import readerloginService from '../service/readerlogin' // 导入登录服务

const router = useRouter()

const goToRegister = () => {
  router.push('/readerregister')
}

const goToResetPassword = () => {
  router.push('/readerresetpassword')
}

const formState = reactive({//表单
  readerid: '',
  password: '',
})

const disabled = computed(() => {
  return !(formState.readerid && formState.password)
})

const onFinish = async (values) => {
  console.log('登录表单数据:', values)
  try {
    const response = await readerloginService(values.readerid, values.password)
    if (response.token) {
      //保存 token 到 localStorage
      localStorage.setItem('token', response.token)
      message.success('登录成功！')
      //跳转到主页面
      router.push('/readeroption')
    } else {
      message.error('登录失败：未获取到令牌')
    }
  } catch (error) {
    console.error('登录出错:', error)
    message.error('登录失败，请检查读者证号和密码')
  }
}
const onFinishFailed = (errorInfo) => {
  console.log('登录失败:', errorInfo)
  message.error('请正确填写表单')
}
</script>

<style scoped>
.readerrelogin-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
}

.login-form-button {
  width: 100%;
}
</style>

<style scoped>
.login-form {
  width: 75%;
}

.login-form-button {
  width: 100%;
}

.readerrelogin-page {
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
