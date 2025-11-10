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
            <a-list-item>
              <div>
                <div><strong>书名:</strong> {{ item.bookname }}</div>
                <div><strong>作者:</strong> {{ item.author }}</div>
                <div><strong>借阅日期:</strong> {{ item.borrowday }}</div>
                <div><strong>位置:</strong> {{ item.location }}</div>
              </div>
            </a-list-item>
          </template>
          <template #header>
            <div>我的个人借阅记录</div>
          </template>
          <template #footer>
            <div v-if="borrowData.length === 0">暂无借阅记录</div>
            <div v-else>记录结束</div>
          </template>
        </a-list>
      </div>

      <!-- 借书功能内容 -->
      <div v-else-if="currentPage === 'borrow'">
        <h2>借书功能</h2>
        <a-alert
          v-if="borrowMessage"
          :message="borrowMessage"
          :type="borrowMessageType"
          show-icon
          style="margin-bottom: 16px"
        />
        <a-input
          v-model:value="bookId"
          placeholder="请输入图书ID (例如: B12345678)"
          style="width: 300px; margin-right: 10px"
        />
        <a-button
          type="primary"
          @click="handleBorrow"
          :loading="borrowLoading"
          :disabled="!bookId"
        >
          借书
        </a-button>

        <!-- 显示当前借阅的书籍 -->
        <div v-if="currentBorrowedBooks.length > 0" style="margin-top: 20px">
          <h3>当前借阅的书籍</h3>
          <a-list size="small" bordered :data-source="currentBorrowedBooks">
            <template #renderItem="{ item }">
              <a-list-item>
                <div>
                  <div><strong>图书ID:</strong> {{ item.book_id }}</div>
                  <div><strong>书名:</strong> {{ item.title }}</div>
                  <div><strong>借阅日期:</strong> {{ item.borrow_date }}</div>
                </div>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>

      <!-- 还书功能内容 -->
      <div v-else-if="currentPage === 'return'">
        <h2>还书功能</h2>
        <a-alert
          v-if="returnMessage"
          :message="returnMessage"
          :type="returnMessageType"
          show-icon
          style="margin-bottom: 16px"
        />
        <a-input
          v-model:value="returnBookId"
          placeholder="请输入要归还的图书ID"
          style="width: 300px; margin-right: 10px"
        />
        <a-button
          type="primary"
          @click="handleReturn"
          :loading="returnLoading"
          :disabled="!returnBookId"
        >
          还书
        </a-button>

        <!-- 显示可归还的书籍 -->
        <div v-if="returnableBooks.length > 0" style="margin-top: 20px">
          <h3>可归还的书籍</h3>
          <a-list size="small" bordered :data-source="returnableBooks">
            <template #renderItem="{ item }">
              <a-list-item>
                <div>
                  <div><strong>图书ID:</strong> {{ item.book_id }}</div>
                  <div><strong>书名:</strong> {{ item.title }}</div>
                  <div><strong>借阅日期:</strong> {{ item.borrow_date }}</div>
                </div>
              </a-list-item>
            </template>
          </a-list>
        </div>
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
          <a-card
            v-for="book in searchResults"
            :key="book.id"
            class="book-card"
            style="width: 300px; margin: 10px"
          >
            <h3>{{ book.title }}</h3>
            <p class="author">{{ book.author }}</p>
            <p class="reader">{{ book.reader }}</p>
            <p class="location">{{ book.location }}</p>
            <p class="book-id"><strong>图书ID:</strong> {{ book.id }}</p>
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
import { ref, computed } from 'vue';
import router from '@/router';
import { message } from 'ant-design-vue';
import search from '../service/search';
import userprofile from '../service/userprofile';
import { borrowBook, returnBook } from '../service/bookService';

const selectedKeys = ref(['']);
const openKeys = ref(['return']);
const currentPage = ref('');

// 借书相关变量
const bookId = ref('');
const borrowLoading = ref(false);
const borrowMessage = ref('');
const borrowMessageType = ref('info');

// 还书相关变量
const returnBookId = ref('');
const returnLoading = ref(false);
const returnMessage = ref('');
const returnMessageType = ref('info');

// 搜索相关变量
const searchValue = ref('')
const searchResults = ref([])
const hasSearched = ref(false)
const token = localStorage.getItem('token')

// 用户信息数据
const userData = ref([])

// 借阅记录数据
const borrowData = ref([])

// 计算属性：当前借阅的书籍和可归还的书籍
const currentBorrowedBooks = computed(() => {
  return borrowData.value.filter(book => !book.return_date);
});

const returnableBooks = computed(() => {
  return currentBorrowedBooks.value;
});

// 借书功能
const handleBorrow = async () => {
  if (!bookId.value.trim()) {
    message.warning('请输入图书ID');
    return;
  }

  borrowLoading.value = true;
  borrowMessage.value = '';

  try {
    const response = await borrowBook(bookId.value, token);

    if (response.message === "借书成功") {
      message.success('借书成功');
      borrowMessage.value = `成功借阅图书ID: ${bookId.value}`;
      borrowMessageType.value = 'success';
      bookId.value = ''; // 清空输入框

      // 刷新借阅记录
      await refreshBorrowData();
    } else {
      throw new Error(response.message || '借书失败');
    }
  } catch (error) {
    console.error('借书出错:', error);
    const errorMessage = error.response?.data?.message || error.message || '借书失败，请稍后重试';
    message.error(errorMessage);
    borrowMessage.value = errorMessage;
    borrowMessageType.value = 'error';
  } finally {
    borrowLoading.value = false;
  }
};

// 还书功能
const handleReturn = async () => {
  if (!returnBookId.value.trim()) {
    message.warning('请输入要归还的图书ID');
    return;
  }

  returnLoading.value = true;
  returnMessage.value = '';

  try {
    const response = await returnBook(returnBookId.value, token);

    if (response.message === "还书成功") {
      message.success('还书成功');
      returnMessage.value = `成功归还图书ID: ${returnBookId.value}`;
      returnMessageType.value = 'success';
      returnBookId.value = ''; // 清空输入框

      // 刷新借阅记录
      await refreshBorrowData();
    } else {
      throw new Error(response.message || '还书失败');
    }
  } catch (error) {
    console.error('还书出错:', error);
    const errorMessage = error.response?.data?.message || error.message || '还书失败，请稍后重试';
    message.error(errorMessage);
    returnMessage.value = errorMessage;
    returnMessageType.value = 'error';
  } finally {
    returnLoading.value = false;
  }
};

// 刷新借阅记录数据
const refreshBorrowData = async () => {
  try {
    const result = await userprofile(token);
    if (result && result.borrowedBooks) {
      borrowData.value = result.borrowedBooks.map(book => ({
        book_id: book.book_id,
        bookname: book.title,
        borrowday: new Date(book.borrow_date).toLocaleDateString('zh-CN'),
        author: book.author,
        location: book.location_index,
        return_date: book.return_date
      }));
    }
  } catch (e) {
    console.error('刷新借阅记录失败:', e);
  }
};

// 搜索功能
const onSearch = async (v) => {
  if (!v.trim()) {
    message.warning('请输入搜索内容')
    return
  }
  hasSearched.value = true
  try {
    const results = await search(v, token)
    if (results && results instanceof Array) {
      searchResults.value = results
      if (results.length === 0) {
        message.info('未找到相关图书')
      }
    } else {
      searchResults.value = []
      message.warning('未找到相关图书')
    }
  } catch (error) {
    console.error('搜索出错:', error)
    message.error('搜索失败，请稍后重试')
    searchResults.value = []
  }
}

const OptionClick = async ({ key }) => {
  if (key === 'borrowdata' || key === 'introduction' || key === 'borrow' || key === 'return' || key === 'sreach') {
    currentPage.value = key;

    if (key === 'introduction') {
      try {
        const result = await userprofile(token);
        if (result && result.userInfo) {
          userData.value = [
            `读者ID: ${result.userInfo.reader_id}`,
            `姓名: ${result.userInfo.name}`,
            `邮箱: ${result.userInfo.email}`
          ];
        } else {
          userData.value = ['失败'];
        }
      } catch (e) {
        console.error('调用失败:', e);
        userData.value = ['异常'];
      }
    }

    if (key === 'borrowdata') {
      await refreshBorrowData();
    }

    // 如果是查询页面，重置搜索状态
    if (key === 'sreach') {
      searchResults.value = [];
      hasSearched.value = false;
      searchValue.value = '';
    }
  } else if (key === 'auth') {
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
