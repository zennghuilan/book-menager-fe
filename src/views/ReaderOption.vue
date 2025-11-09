<template>
  <a-layout style="height: 100%;">
    <a-layout-sider width="200">
      <a-menu
        v-model:selectedKeys="selectedKeys"
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

      <!-- 借书功能内容 -->
      <div v-else-if="currentPage === 'borrow'">
        <h2>借书功能</h2>
        <a-input
          v-model:value="bookName"
          placeholder="请输入书名"
          style="width: 300px; margin-right: 10px"
        />
        <a-button type="primary" @click="handleBorrow">借书</a-button>
      </div>

      <!-- 还书功能内容 -->
      <div v-else-if="currentPage === 'return'">
        <h2>还书功能</h2>
        <a-input
          v-model:value="returnBookName"
          placeholder="请输入要归还的书名"
          style="width: 300px; margin-right: 10px"
        />
        <a-button type="primary" @click="handleReturn">还书</a-button>
      </div>

      <!-- 查询功能内容 -->
      <div v-else-if="currentPage === 'sreach'" class="search-page">
        <h2>搜索功能</h2>
        <div class="search-box">
          <a-input-search
            v-model:value="searchValue"
            placeholder="搜索图书..."
            enter-button
            @search="onSearch"
            style="width: 400px"
          />
        </div>

        <div class="books-grid" style="margin-top: 20px">
          <a-card v-for="book in searchResults" :key="book.id" class="book-card" style="width: 300px; margin: 10px">
            <h3>{{ book.title }}</h3>
            <p class="author">{{ book.author }}</p>
            <p class="reader">{{ book.reader }}</p>
            <p class="location">{{ book.location }}</p>
          </a-card>
        </div>

        <div v-if="searchResults.length === 0 && hasSearched" class="no-results">
          <p>未找到相关图书</p>
        </div>
      </div>

      <!-- 默认内容 -->
      <div v-else>
        请点击你要跳转的页面
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { message } from 'ant-design-vue';
import search from '../service/search';
import getUserInfo from '../service/userprofile';

const selectedKeys = ref(['']);
const openKeys = ref(['return']);//初始的时候就展开退出登录的情况
const currentPage = ref('');
const bookName = ref('');
const returnBookName = ref('');

// 搜索相关变量
const searchValue = ref('')
const searchResults = ref([])
const hasSearched = ref(false)
const token = localStorage.getItem('token')

// 用户信息数据
const userData = ref([])

// 借阅记录数据
const borrowData = [
  {
    "bookname":"《活着》",
    "borrowday":"11,9"
  },
  {
    "bookname":"《第七天》",
    "borrowday":"11,8"
  }
]

// 借书功能
const handleBorrow = () => {
  if (!bookName.value) {
    message.warning('请输入书名');
    return;
  }
  message.success(`成功借阅《${bookName.value}》`);
  bookName.value = ''; // 清空输入框
};

// 还书功能
const handleReturn = () => {
  if (!returnBookName.value) {
    message.warning('请输入要归还的书名');
    return;
  }
  message.success(`成功归还《${returnBookName.value}》`);
  returnBookName.value = ''; // 清空输入框
};
// 搜索功能
const onSearch = async (v) => {
  if (!v.trim()) {//用取反的方式来拿到输入框是否为空的判断
    message.warning('请输入搜索内容')
    return
  }
  hasSearched.value = true//用于标记用户是否完成了搜索 如果输入框为空 那么函数就会被return
  try {
    // 调用搜索API，传递搜索关键词和token
    const results = await search(v, token)

    // 处理搜索结果
    if (results && results instanceof Array) {//这是找到最简单的判断结果为数组的方法
      searchResults.value = results
      if (results.length === 0) {
        message.info('未找到相关图书')
      }
    } else {
      searchResults.value = []//可能在数据的处理的时候会出现报错
      message.warning('未找到相关图书')
    }
  } catch (error) {//
    console.error('搜索出错:', error)//在控制台
    message.error('搜索失败，请稍后重试')//在界面
    searchResults.value = []
  }
}




const OptionClick = async ({ key }) => {
  if (key === 'borrowdata' || key === 'introduction' || key === 'borrow' || key === 'return' || key === 'sreach') {
    currentPage.value = key;

    if (key === 'introduction') {
      try {
        const userInfo = await getUserInfo(token);
        if (userInfo) {
          userData.value = [
            `用户名: ${userInfo.username}`,
            `读者证号: ${userInfo.readerid}`,
            `邮箱: ${userInfo.email}`,
            `密码: ${userInfo.password}`
          ];
          console.log('获取到的用户信息:', userInfo);
        } else {
          userData.value = ['获取用户信息失败'];
        }
      } catch (e) {
        console.error('调用用户数据函数失败:', e);
        userData.value = ['获取用户信息异常'];
      }
    }

    // 如果是查询页面，重置搜索状态
    if (key === 'sreach') {
      searchResults.value = [];
      hasSearched.value = false;
      searchValue.value = '';
    }
  } else if (key === 'auth') {
    // 只有点击退出登录时才进行路由跳转
    currentPage.value = '';
    router.push('/auth');
  }
};
</script>

<style scoped>
.site-layout-background {
  background: #fff;
  width: 100%;
  height: 100%;
}

.books-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.book-card {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.no-results {
  text-align: center;
  margin-top: 20px;
  color: #999;
}
</style>
