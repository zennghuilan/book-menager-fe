<!-- 原来的导航菜单文件 -->
<template>
  <a-menu
    v-model:selectedKeys="current"
    mode="horizontal"
    :items="items"
    @click="handleMenuClick"
  />
  <router-view></router-view> <!-- 添加这行显示路由内容 -->
</template>

<script setup>
import { h, ref } from 'vue';
import { useRouter } from 'vue-router'; // 导入路由
import { MailOutlined, SettingOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const current = ref(['mail']);

const items = ref([
  {
    key: 'profile',
    icon: () => h(MailOutlined),
    label: '个人主页',
    title: '个人主页',
  },
  {
    key: 'functions',
    icon: () => h(SettingOutlined),
    label: '功能选择',
    title: '功能选择',
    children: [
      {
        type: 'group',
        label: '图书处理',
        children: [
          {
            label: '借书',
            key: 'borrow',
          },
          {
            label: '还书',
            key: 'return',
          },
          {
            label: '查询',
            key: 'search',
          },
        ],
      },
    ],
  },
]);
const handleMenuClick = ({ key }) => {
  if (key === 'borrow') {
    router.push('/borrow');
  }
  // 可以添加其他菜单项的处理
};
</script>
