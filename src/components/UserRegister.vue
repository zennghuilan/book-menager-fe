<template>
  <a-form
    :model="formState"
    name="register"
    class="register-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: '请输入用户名' }]"
    >
      <a-input
        v-model:value="formState.username"
        placeholder="请输入用户名"
      />
    </a-form-item>

    <a-form-item
      label="邮箱"
      name="email"
      :rules="[{ required: true, message: '请输入邮箱' }]"
    >
      <a-input
        v-model:value="formState.email"
        placeholder="请输入邮箱"
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
        class="register-form-button"
      >
        注册
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, computed } from 'vue';

const formState = reactive({
  username: '',
  email: '',
  password: ''
});

const disabled = computed(() => {
  return !(formState.username && formState.email && formState.password);
});

const onFinish = (values) => {
  console.log('注册成功:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('注册失败:', errorInfo);
};
</script>

<style scoped>
.register-form {
  max-width: 400px;
}

.register-form-button {
  width: 100%;
}
</style>
