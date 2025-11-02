<template>
  <a-form
    :model="formState"
    name="reset_password"
    class="reset-form"
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
      label="邮箱验证码"
      name="code"
      :rules="[{ required: true, message: '请输入验证码' }]"
    >
      <div class="code-row">
        <a-input
          v-model:value="formState.code"
          placeholder="请输入验证码"
        />
        <a-button
          @click="sendCode"
          :disabled="!formState.username || countdown > 0"
        >
          {{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
        </a-button>
      </div>
    </a-form-item>

    <a-form-item
      label="新密码"
      name="password"
      :rules="[
        { required: true, message: '请输入新密码' },
        { min: 6, message: '密码至少6位' }
      ]"
    >
      <a-input-password
        v-model:value="formState.password"
        placeholder="请输入新密码"
      />
    </a-form-item>

    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="disabled"
        class="reset-form-button"
      >
        重置密码
      </a-button>
      Or
      <a @click="goToLogin">返回登录</a>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';

const formState = reactive({
  username: '',
  code: '',
  password: ''
});

const countdown = ref(0);

const disabled = computed(() => {
  return !(formState.username && formState.code && formState.password);
});

const sendCode = () => {
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value === 0) {
      clearInterval(timer);
    }
  }, 1000);

  console.log('发送验证码到邮箱:', formState.username);
};

const onFinish = (values) => {
  console.log('重置密码成功:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('重置密码失败:', errorInfo);
};

const goToLogin = () => {
  console.log('跳转到登录页面');
};
</script>

<style scoped>
.reset-form {
  max-width: 400px;
}

.code-row {
  display: flex;
  gap: 8px;
}

.reset-form-button {
  width: 100%;
}
</style>
