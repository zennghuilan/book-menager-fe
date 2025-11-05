<template>
  <div>
    <CardComponent
      v-for="item in cardData"
      :key="item.readerid"
      :name="item.name"
      :email="item.email"
      :password="item.password"
      :content="item.content"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CardComponent from './CardComponent.vue'

const cardData = ref([
  { readerid: 1, name: '1', email:'1',password:'',content: '借阅书籍以及对应的归还日期' },
  { readerid: 2, name: '2', email:'1',password:'',content: '借阅书籍以及对应的归还日期' },
  { readerid: 3, name: '3', email:'1',password:'',content: '借阅书籍以及对应的归还日期' }
])
</script>
