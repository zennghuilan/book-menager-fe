<template>
  <a-form
    :model="formState"
    name="reset_password_form"
    class="reset-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: '请输入您的用户名!' }]"
    >
      <a-input
        v-model:value="formState.username"
        placeholder="请输入用户名"
      />
    </a-form-item>

    <a-form-item
      label="邮箱验证码"
      name="verificationCode"
      :rules="[{ required: true, message: '请输入邮箱验证码!' }]"
    >
      <div class="code-input-container">
        <a-input
          v-model:value="formState.verificationCode"
          placeholder="请输入邮箱验证码"
          class="code-input"
        />
        <a-button
          type="primary"
          @click="sendVerificationCode"
          :disabled="codeButtonDisabled"
          :loading="codeSending"
          class="code-button"
        >
          {{ codeButtonText }}
        </a-button>
      </div>
    </a-form-item>

    <a-form-item
      label="新密码"
      name="newPassword"
      :rules="[
        { required: true, message: '请输入新密码!' },
        { min: 6, message: '密码长度不能少于6位!' }
      ]"
    >
      <a-input-password
        v-model:value="formState.newPassword"
        placeholder="请输入新密码"
      />
    </a-form-item>

    <a-form-item>
      <a-button
        :disabled="disabled"
        type="primary"
        html-type="submit"
        class="reset-form-button"
      >
        重置密码
      </a-button>
      Or
      <a href="" @click.prevent="goToLogin">返回登录</a>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';

const formState = reactive({
  username: '',
  verificationCode: '',
  newPassword: ''
});

const codeSending = ref(false);
const countdown = ref(0);

const disabled = computed(() => {
  return !(formState.username && formState.verificationCode && formState.newPassword);
});

const codeButtonDisabled = computed(() => {
  return !formState.username || countdown.value > 0;
});

const codeButtonText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value}秒后重新获取`;
  }
  return '获取验证码';
});

const sendVerificationCode = () => {
  codeSending.value = true;

  setTimeout(() => {
    console.log('发送验证码到用户邮箱:', formState.username);

    countdown.value = 60;

    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    codeSending.value = false;
  }, 1000);
};

const onFinish = (values) => {
  console.log('重置密码成功:', values);
  alert('密码重置成功！');
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
  margin: 0 auto;
}

.code-input-container {
  display: flex;
  gap: 8px;
}

.code-input {
  flex: 1;
}

.code-button {
  white-space: nowrap;
}

.reset-form-button {
  width: 100%;
}
</style>
