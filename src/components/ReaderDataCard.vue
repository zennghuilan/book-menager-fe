<template>
  <a-card :readerid="readerid" style="margin-bottom: 16px">
    <p>{{ name }}</p>
    <p>{{ password }}</p>
    <p>{{ email }}</p>
    <p>{{ content }}</p>
  </a-card>
</template>

<script setup>
defineProps({
  readerid:String,
  name: String,
  password:String,
  email:String,
  content: String
})
</script>
