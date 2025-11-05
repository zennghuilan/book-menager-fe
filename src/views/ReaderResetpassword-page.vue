<template>
<div class="readerresetpassword-page">
    <ReaderLogin v-if="currentForm === 'login'" />
    <Resetpassword
    v-else
    :switch-to-login="switchToLogin"
    :on-submit="handleResetpassword"
    />
</div>
</template>
//在在这里好像就是只有登录的接口不一样 能不能实现合并捏
<script setup>
import { ref } from 'vue';


const currentForm = ref('reset'); //初始量

const handleResetpassword = (formData) => {
    console.log('重置数据:', formData);
};

// 从重置密码切换到登录
const switchToLogin = () => {
    currentForm.value = 'login';
};
</script>

<style scoped>
.masterresetpassword-page {
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
