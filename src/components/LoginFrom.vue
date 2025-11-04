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
      name="usernumber"
      :rules="[{ required: true, message: '请输入读者证号' }]"
    >
      <a-input
        v-model:value="formState.usernumber"
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
      >
        登录
      </a-button>
    </a-form-item>

    <a-form-item>
      <a @click="switchToRegister">注册一个新用户</a>
      <a @click="switchToResetpassword">重置密码</a>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, computed } from 'vue';

// 通过 props 接收切换函数
const props = defineProps({
  switchToRegister: {
    type: Function,
    required: true
  },
  onSubmit: {
    type: Function,
    required: true
  }
});

const formState = reactive({
  username: '',
  password: ''
});

const disabled = computed(() => {
  return !(formState.usernumber && formState.password);
});

const onFinish = (values) => {
  props.onSubmit(values);
};

const onFinishFailed = (errorInfo) => {
  console.log('登录失败:', errorInfo);
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.login-form-button {
  width: 100%;
}
</style>
