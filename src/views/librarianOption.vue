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
            <a-menu-item key="viewreaders">查看读者</a-menu-item>
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
          <!-- 查看用户列表 - 修改为搜索功能 -->
          <div v-if="currentPage === 'viewreaders'">
            <h3 :style="{ margin: '16px 0' }">用户搜索</h3>
            <div style="margin-bottom: 16px">
              <a-input-search
                v-model:value="searchKeyword"
                placeholder="请输入用户名关键词"
                enter-button="搜索"
                @search="searchUsers"
                style="width: 400px"
              />
            </div>
            <a-list size="small" bordered :data-source="readerList">
              <template #renderItem="{ item }">
                <a-list-item>
                  {{ `读者ID: ${item.id} - 姓名: ${item.name}` }}
                </a-list-item>
              </template>
              <template #header>
                <div>搜索结果</div>
              </template>
              <template #footer>
                <div v-if="readerList.length === 0 && hasSearched">未找到相关用户</div>
                <div v-else-if="readerList.length > 0">共 {{ readerList.length }} 个用户</div>
                <div v-else>请输入关键词搜索用户</div>
              </template>
            </a-list>
          </div>

          <!-- 冻结账户功能 -->
          <div v-else-if="currentPage === 'freezeAccount'">
            <h2>冻结账户</h2>
            <a-input
              v-model:value="freezereadername"
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
import searchUsersService from '../service/searchUsers';

const selectedKeys2 = ref(['1']);
const openKeys = ref(['logout']);
const currentPage = ref('');

// 获取管理员token
const token = localStorage.getItem('token')

// 读者列表相关
const readerList = ref([])
const searchKeyword = ref('')
const hasSearched = ref(false)

// 输入框数据
const freezereadername = ref('');
const newBookName = ref('');
const newBookAuthor = ref('');
const newBooklocation = ref('')
const deleteBookName = ref('');

// 审核申请数据
const auditList = ref([
  {
    "username":"zenghuilan",
    "email":"234808961@qq.com"
  }
])

// 搜索用户功能
const searchUsers = async () => {
  if (!searchKeyword.value.trim()) {
    message.warning('请输入搜索关键词');
    return;
  }

  try {
    const result = await searchUsersService(searchKeyword.value, token);
    if (result && Array.isArray(result)) {
      readerList.value = result;
      hasSearched.value = true;
      if (result.length === 0) {
        message.info('未找到相关用户');
      } else {
        message.success(`找到 ${result.length} 个用户`);
      }
    } else {
      readerList.value = [];
      hasSearched.value = true;
      message.warning('未找到相关用户');
    }
  } catch (e) {
    console.error('搜索用户失败:', e);
    message.error('搜索用户异常');
    readerList.value = [];
    hasSearched.value = true;
  }
};

// 冻结账户功能
const handleFreeze = () => {
  if (!freezereadername.value) {
    message.warning('请输入要冻结的用户名');
    return;
  }
  message.success(`已冻结用户: ${freezereadername.value}`);
  freezereadername.value = ''; // 清空输入框
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
  const embeddedPages = ['viewreaders', 'freezeAccount', 'addBook', 'deleteBook', 'auditList'];

  if (embeddedPages.includes(key)) {
    // 显示对应的卡片内容，不进行路由跳转
    currentPage.value = key;
    freezereadername.value = '';
    newBookName.value = '';
    newBookAuthor.value = '';
    newBooklocation.value ='';
    deleteBookName.value = '';

    // 如果是查看读者页面，重置搜索状态
    if (key === 'viewreaders') {
      searchKeyword.value = '';
      readerList.value = [];
      hasSearched.value = false;
    }
  } else {
    router.push('/authlibrarian');
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
