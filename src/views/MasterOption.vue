<template>
  <a-layout style="height: 100%;">
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%' }"
          @click="OptionClick"
        >
          <a-sub-menu key="user">
            <template #title>
              <span>
                <user-outlined />
                用户管理
              </span>
            </template>
            <a-menu-item key="viewUsers">查看用户</a-menu-item>
            <a-menu-item key="freezeAccount">冻结账户</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="book">
            <template #title>
              <span>
                <laptop-outlined />
                书籍改动
              </span>
            </template>
            <a-menu-item key="addBook">增加书籍</a-menu-item>
            <a-menu-item key="deleteBook">删除书籍</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="audit">
            <template #title>
              <span>
                <notification-outlined />
                审核申请
              </span>
            </template>
            <a-menu-item key="auditList">申请列表</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="logout">
            <template #title>
              <span>
                <logout-outlined />
                退出登录
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
          <!-- 查看用户列表 -->
          <div v-if="currentPage === 'viewUsers'">
            <h3 :style="{ margin: '16px 0' }">用户列表</h3>
            <a-list size="small" bordered :data-source="userList">
              <template #renderItem="{ item }">
                <a-list-item>
                  {{ `${item.name}` }}
                  {{ `${item.id}` }}
                </a-list-item>

              </template>
              <template #header>
                <div>系统用户列表</div>
              </template>
              <template #footer>
                <div>共 {{ userList.length }} 个用户</div>
              </template>
            </a-list>
          </div>

          <!-- 冻结账户功能 -->
          <div v-else-if="currentPage === 'freezeAccount'">
            <h2>冻结账户</h2>
            <a-input
              v-model:value="freezeUsername"
              placeholder="请输入要冻结的用户名"
              style="width: 300px; margin-right: 10px"
            />
            <a-button type="primary" @click="handleFreeze">冻结账户</a-button>
          </div>

          <!-- 增加书籍功能 -->
          <div v-else-if="currentPage === 'addBook'">
            <h2>增加书籍</h2>
            <a-input
              v-model:value="newBookName"
              placeholder="请输入书籍名称"
              style="width: 300px; margin-right: 10px; margin-bottom: 10px"
            />
            <br>
            <a-input
              v-model:value="newBookAuthor"
              placeholder="请输入作者"
              style="width: 300px; margin-right: 10px; margin-bottom: 10px"
            />
            <br>
            <a-button type="primary" @click="handleAddBook">添加书籍</a-button>
          </div>

          <!-- 删除书籍功能 -->
          <div v-else-if="currentPage === 'deleteBook'">
            <h2>删除书籍</h2>
            <a-input
              v-model:value="deleteBookName"
              placeholder="请输入要删除的书籍名称"
              style="width: 300px; margin-right: 10px"
            />
            <a-button type="primary" danger @click="handleDeleteBook">删除书籍</a-button>
          </div>

          <!-- 审核申请列表 -->
          <div v-else-if="currentPage === 'auditList'">
            <h3 :style="{ margin: '16px 0' }">审核申请列表</h3>
            <a-list size="small" bordered :data-source="auditList">
              <template #renderItem="{ item }">
                <a-list-item>
                  {{ item.username }}
                  {{ item.email }}
                  <a-button size="small" type="primary" style="margin-left: 10px">通过</a-button>
                  <a-button size="small" danger style="margin-left: 5px">拒绝</a-button>
                </a-list-item>
              </template>
              <template #header>
                <div>待审核申请</div>
              </template>
              <template #footer>
                <div>共 {{ auditList.length }} 个申请待处理</div>
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
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { message } from 'ant-design-vue';

const selectedKeys2 = ref(['1']);
const openKeys = ref(['logout']);
const currentPage = ref('');

// 输入框数据
const freezeUsername = ref('');
const newBookName = ref('');
const newBookAuthor = ref('');
const newBooklocation=ref('')
const deleteBookName = ref('');

// 用户列表数据
const userList = [
  {
    "id":"456621",
    "name": "小曾"
  },
  {
    "id":"456789",
    "name": "小慧"
  }
]

// 审核申请数据
const auditList = [
  {
    "username":"zenghuilan",
    "email":"234808961@qq.com"
  }
]

// 冻结账户功能
const handleFreeze = () => {
  if (!freezeUsername.value) {
    message.warning('请输入要冻结的用户名');
    return;
  }
  message.success(`已冻结用户: ${freezeUsername.value}`);
  freezeUsername.value = ''; // 清空输入框
};

// 增加书籍功能
const handleAddBook = () => {
  if (!newBookName.value || !newBookAuthor.value || !newBooklocation.value) {
    message.warning('请输入书籍名称和作者，索引位置');
    return;
  }
  message.success(`成功添加书籍:《${newBookName.value}》作者: ${newBookAuthor.value} 书籍的索引位置:${newBooklocation.value}`);
  //输入框为空
  newBookName.value = '';
  newBookAuthor.value = '';
  newBooklocation.value = '';
};
const handleDeleteBook = () => {
  if (!deleteBookName.value) {
    message.warning('请输入要删除的书籍名称');
    return;
  }
  message.success(`已删除书籍: ${deleteBookName.value}`);
  deleteBookName.value = ''; // 清空输入框
};

const OptionClick = ({ key }) => {
  const embeddedPages = ['viewUsers', 'freezeAccount', 'addBook', 'deleteBook', 'auditList'];

  if (embeddedPages.includes(key)) {
    // 显示对应的卡片内容，不进行路由跳转
    currentPage.value = key;
    freezeUsername.value = '';
    newBookName.value = '';
    newBookAuthor.value = '';
    newBooklocation.value ='';
    deleteBookName.value = '';
  } else {
    router.push(`/authmaster`);
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
