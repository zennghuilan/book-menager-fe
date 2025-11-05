<template>
  <a-menu
    v-model:selectedKeys="current"
    mode="horizontal"
    :items="items"
    @click="handleMenuClick"
  />
  <router-view/>
</template>

<script setup>
import { h, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const current = ref(['mail']);
const items = ref([
  {
    key: 'check',
    label: '审核申请',
    title: '审核申请',
  },
  {
    key: 'manage',
    label: '用户信息管理',
    title: '用户信息管理',
  },
  {
    key: 'functions',
    label: '书籍改动',
    title: '书籍改动',
    children: [
      {
        type: 'group',
        label: '图书处理',
        children: [
          {
            label: '添加',
            key: 'add',
          },
          {
            label: '减少',
            key: 'reduce',
          },
        ],
      },
    ],
  },
  {
  key: 'exit',
  label: h(
      'a',
      {
        href: '/option',
        target: '_blank',
      },
      '退出登录',
    ),
    title: '退出登录',
  },
]);

const handleMenuClick = ({ key }) => {
  if (key === 'check') {
    router.push('/check');
  }
  if (key === 'manage') {
    router.push('/manage');
  }
  if (key === 'add') {
    router.push('/add');
  }
  if (key === 'reduce') {
    router.push('/reduce');
  }
  if (key === 'exit') {
    router.push('/auth');
  }
};
</script>
