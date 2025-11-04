<!-- BorrowBook.vue -->
<template>
  <div>
    <h2>还书功能</h2>
    <a-input
      v-model:value="bookName"
      placeholder="请输入书名"
      style="width: 300px; margin-right: 10px"
    />
    <a-button type="primary" @click="handleRuturn">还书</a-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';

const bookName = ref('');

const handleRuturn = () => {
  if (!bookName.value) {
    message.warning('请输入书名');
    return;
  }
  message.success(`成功归还《${bookName.value}》`);
};
</script>
