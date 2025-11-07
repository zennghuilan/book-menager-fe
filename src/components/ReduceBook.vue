<!-- BorrowBook.vue -->
<template>
  <div>
    <h2>删除书籍</h2>
    <a-input
      v-model:value="bookName"
      placeholder="请输入删除的书名"
      style="width: 300px; margin-right: 10px"
    />
    <a-button type="primary" @click="handleReturn">删除</a-button>
  </div>

  <a-form-item>
    <a @click="$router.push('/masteroption')">返回首页</a>
  </a-form-item>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';

const bookName = ref('');

const handleReturn = () => {
  if (!bookName.value) {
    message.warning('请输入删除的书名');
    return;
  }
  message.success(`成功删除《${bookName.value}》`);
};
</script>
