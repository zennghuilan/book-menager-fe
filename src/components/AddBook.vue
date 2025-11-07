<!-- BorrowBook.vue -->
<template>
  <div>
    <h2>增加书籍</h2>
    <a-input
      v-model:value="bookName"
      placeholder="请输入增加的书名"
      style="width: 300px; margin-right: 10px"
    />
    <a-button type="primary" @click="handleAdd">增加</a-button>

    <a-form-item>
    <a @click="$router.push('/masteroption')">返回首页</a>
    </a-form-item>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';

const bookName = ref('');

const handleAdd = () => {
  if (!bookName.value) {
    message.warning('请输入增加的书名');
    return;
  }
  message.success(`成功增加《${bookName.value}》`);
};
</script>
