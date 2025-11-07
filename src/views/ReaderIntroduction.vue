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
          <!-- 用户信息卡片内容 -->
          <div v-if="currentPage === 'introduction'">
            <h3 :style="{ margin: '16px 0' }">用户信息</h3>
            <a-list size="small" bordered :data-source="userData">
              <template #renderItem="{ item }">
                <a-list-item>{{ item }}</a-list-item>
              </template>
              <template #header>
                <div>我的个人信息</div>
              </template>
              <template #footer>
                <div>信息结束</div>
              </template>
            </a-list>
          </div>

          <!-- 借阅记录卡片内容 -->
          <div v-else-if="currentPage === 'borrowdata'">
            <h3 :style="{ margin: '16px 0' }">借阅记录查询</h3>
            <a-list size="small" bordered :data-source="borrowData">
              <template #renderItem="{ item }">
                <a-list-item>{{ item }}</a-list-item>
              </template>
              <template #header>
                <div>我的个人借阅记录</div>
              </template>
              <template #footer>
                <div>记录结束</div>
              </template>
            </a-list>
          </div>

          <!-- 默认内容 -->
          <div v-else>
            请点击你要跳转的页面
          </div>
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
const currentPage = ref('');

// 用户信息数据
const userData = [
  'username:小曾',
  'readerid:070718',
  'email:234808961@qq.com',
  'password:123456'
]

// 借阅记录数据
const borrowData = [
  'book 1',
  'returnday 1',
  'book 2',
  'returnday 2'
]

const OptionClick = ({ key }) => {
  if (key === 'borrowdata' || key === 'introduction') {
    // 显示对应的卡片内容，不进行路由跳转
    currentPage.value = key;
  } else {
    // 其他菜单项进行路由跳转
    currentPage.value = '';
    router.push(`/${key}`);
  }
};
</script>

<style scoped>
.site-layout-background {
  background: #fff;
  width: 100%;
  height: 100%;
}
</style>
