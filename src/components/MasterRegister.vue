<template>
  <a-form
    :model="formState"
    name="register"
    class="register-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="姓名"
      name="mastername"
      :rules="[{ required: true, message: '请输入姓名' }]"
    >
      <a-input
        v-model:value="formState.mastername"
        placeholder="请输入姓名"
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
        发送申请
      </a-button>
    </a-form-item>
    <a-form-item>
      <a @click="switchToLogin">已有账号？点击登录</a>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, computed } from 'vue';
const props = defineProps({
  switchToLogin: {
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
  email: '',
  password: ''
});

// eslint-disable-next-line vue/no-dupe-keys
const switchToLogin = () => {
  window.location.href = '/authmaster'
}

const disabled = computed(() => {
  return !(formState.username && formState.email && formState.password);
});

const onFinish = (values) => {
  props.onSubmit(values);
};

const onFinishFailed = (errorInfo) => {
  console.log('申请失败:', errorInfo);
};
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
}

.register-form-button {
  width: 100%;
}
</style>
