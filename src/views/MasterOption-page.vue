<template>
  <a-layout>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%' }"
          @click="OptionClick"
        >
          <a-sub-menu key="person">
            <template #title>
              <span>
                <user-outlined />
                个人主页
              </span>
            </template>
            <a-menu-item key="introduction">用户信息</a-menu-item>
            <a-menu-item key="borrowdata">借阅记录</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="function">
            <template #title>
              <span>
                <laptop-outlined />
                功能选择
              </span>
            </template>
            <a-menu-item key="borrow">借书</a-menu-item>
            <a-menu-item key="return">还书</a-menu-item>
            <a-menu-item key="sreach">查询</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="return">
            <template #title>
              <span>
                <notification-outlined />
                退出
              </span>
            </template>
            <a-menu-item key="auth">退出登录</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 24px">
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          Content
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';

const selectedKeys2 = ref(['1']);
const openKeys = ref(['return']);
const OptionClick = ({ key }) => {
  router.push(`/${key}`);
};
</script>

<style scoped>
.site-layout-background {
  background: #fff;
  width: 100%;
  height: 100%;
}
</style>
