<template>
<div class="search-page">
    <div class="search-box">
      <h2>搜索功能</h2>
        <a-input-search
        v-model:value="searchValue"
        placeholder="搜索图书..."
        enter-button
        @search="onSearch"
        />
    </div>

    <div class="books-grid">
        <a-card
        v-for="book in searchResults"
        :key="book.id"
        class="book-card"
        >
        <h3>{{book.title}}</h3>
        <p class="author">{{book.author}}</p>
        <p class="reader">{{book.reader}}</p>
        <p class="location">{{book.location}}</p>
        </a-card>
    </div>

    <div v-if="searchResults.length === 0 && hasSearched" class="no-results">
        <p>未找到相关图书</p>
    </div>

    <a-form-item>
    <a @click="$router.push('/option')">返回首页</a>
    </a-form-item>
</div>
</template>

<script setup>
import { ref } from "vue"
import { message } from "ant-design-vue"
import search from "../service/search"
const searchValue = ref('')//为什么这里用的是value就会报错显示获取不到这个值
const searchResults = ref([])
const hasSearched = ref(false)
const token = localStorage.getItem("token")

const onSearch = async (v) => {//先定义出一个异步函数 将用户搜索用的关键词传入函数中
    if (!v.trim()) {//用！来判断该输入值是否为空的
        message.warning('请输入搜索内容')//空的话就会显示这个内容
        return//函数不运行
    }
    hasSearched.value = true
    try {
        // 3. 调用搜索API
        const results = await search(v, token)

        // 4. 处理搜索结果
        if (results) {
            searchResults.value = results
        } else {
            searchResults.value = []
        }
    } catch (error) {
        console.error('搜索出错:', error)//会在控制台看到出错
        message.error('搜索失败，请稍后重试')//用户端进行对应的反馈
        searchResults.value = []
    }
}
</script>

<style scoped>
.search-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-box {
  margin-bottom: 24px;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.author {
  color: #8c8c8c;
}

.reader {
  color: #595959;
}

.no-results {
  text-align: center;
  padding: 40px 0;
  color: #8c8c8c;
}
</style>
