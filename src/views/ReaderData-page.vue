<template>
  <div class="card-container">
    <ReaderDataCard
      v-for="item in cardData"
      :key="item.readerid"
      :readerid="item.readerid.toString()"
      :name="item.name"
      :email="item.email"
      :password="item.password"
      :content="item.content"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ReaderDataCard from '@/components/ReaderDataCard.vue';


const cardData = ref([
  {
    readerid: 1,
    name: '读者1',
    email: '',
    password: '',
    content: '借阅书籍以及对应的归还日期'
  },
  {
    readerid: 2,
    name: '读者2',
    email: '',
    password: '',
    content: '借阅书籍以及对应的归还日期'
  },
  {
    readerid: 3,
    name: '读者3',
    email: '',
    password: '',
    content: '借阅书籍以及对应的归还日期'
  }
])
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  width: 75%;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
  padding: 20px;
}
</style>

