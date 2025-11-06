<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="读者证号">readerid</a-tab-pane>
    <a-tab-pane key="2" tab="借阅图书" force-render>borrowbook</a-tab-pane>
    <a-tab-pane key="3" tab="归还时间">returnbook</a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { ref } from 'vue';
const activeKey = ref('1');
</script>

<style scoped>
.a-list{
    width:100%;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

:deep(.ant-list-item) {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.3s ease;
    font-size: 14px;
    color: #333;
}

:deep(.ant-list-item:hover) {
    background-color: #f8f9fa;
    transform: translateX(5px);
}

:deep(.ant-list-item:last-child) {
    border-bottom: none;
}
</style>
