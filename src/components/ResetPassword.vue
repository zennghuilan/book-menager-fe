<template>
  <!-- 保持你原有的所有代码不变 -->
  <a-form
    :model="formState"
    name="resetpassword"
    class="resetpassword-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <!-- 所有表单内容完全保持不变 -->
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: '请输入用户名' }]"
    >
      <a-input v-model:value="formState.username" placeholder="请输入用户名" />
    </a-form-item>

    <a-form-item
      label="重置密码"
      name="password"
      :rules="[
        { required: true, message: '请输入重置后密码' },
        { min: 6, message: '密码至少6位' },
      ]"
    >
      <a-input-password v-model:value="formState.password" placeholder="请输入重置后密码" />
    </a-form-item>

    <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '请输入邮箱' }]">
      <a-input v-model:value="formState.email" placeholder="请输入邮箱" />
    </a-form-item>

    <a-form-item
      label="验证码"
      name="verificationCode"
      :rules="[{ required: true, message: '请输入验证码' }]"
    >
      <a-input-group compact>
        <a-input v-model:value="formState.verificationCode" style="width: calc(100% - 102px)" />
        <a-button type="primary">获取验证码</a-button>
      </a-input-group>
    </a-form-item>

    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="disabled"
        class="resetpassword-form-button"
      >
        注册
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, computed } from 'vue'

const props = defineProps({
  switchToLogin: {
    type: Function,
    required: true,
  },
  onSubmit: {
    type: Function,
    required: true,
  },
})

const formState = reactive({
  username: '',
  email: '',
  password: '',
  verificationCode: '',
})

const disabled = computed(() => {
  return !(
    formState.username &&
    formState.email &&
    formState.password &&
    formState.verificationCode
  )
})

const onFinish = (values) => {
  props.onSubmit(values)
}

const onFinishFailed = (errorInfo) => {
  console.log('重置密码失败:', errorInfo)
}
</script>

<style>
.resetpassword-form {
  width: 100%;
  padding: 24px;
  border-radius: 6px;
}

.resetpassword-form-button {
  width: 100%;
}
</style>
