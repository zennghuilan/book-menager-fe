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
  if (key === 'borrow') {
    router.push('/borrow');
  }
  if (key === 'return') {
    router.push('/return');
  }
  if (key === 'search') {
    router.push('/search');
  }
  if (key === 'exit') {
    router.push('/auth');
  }
};
</script>

//为什么这个样式如此的诡异 我想要的比较大的。。。。。。。。。
