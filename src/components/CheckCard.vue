<template>
  <a-card :name="name" style="margin-bottom: 16px">
    <p>{{ name }}</p>
    <p>{{ email }}</p>
  </a-card>
</template>


<script setup>
defineProps({
  name: String,
  email:String,
  application: String
})
</script>
