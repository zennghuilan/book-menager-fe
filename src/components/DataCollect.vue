<template>
  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="16">
      <a-col :span="6" v-for="item in 24" :key="item">
        <a-card :title="'卡片 ' + item" :bordered="false" style="margin-bottom: 16px">
          <p>卡片内容 {{ item }}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'CardLayout'
}
</script>
