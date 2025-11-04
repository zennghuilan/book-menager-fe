<template>
<div class="search-page">
    <!-- 搜索框 -->
    <div class="search-box">
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
        </a-card>
    </div>

    <div v-if="searchResults.length === 0 && hasSearched" class="no-results">
        <p>未找到相关图书</p>
    </div>
</div>
</template>

<script setup>
import { ref } from "vue"
import { message } from "ant-design-vue"
import search from "../service/search"

// 响应式
const searchValue = ref('')//为什么这里用的是value就会报错显示获取不到这个值
const searchResults = ref([])
const hasSearched = ref(false)
const token = localStorage.getItem("token")

// 基于第一个函数的补充版本
const onSearch = async (v) => {
    // 1. 输入验证
    if (!v.trim()) {
        message.warning('请输入搜索内容')
        return
    }

    // 2. 标记已执行搜索
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
        // 5. 错误处理
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
