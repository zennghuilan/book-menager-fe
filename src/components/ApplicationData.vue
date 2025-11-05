<template>
  <a-form
    :model="formState"
    v-bind="layout"
    name="nest-messages"
    :validate-messages="validateMessages"
    @finish="onFinish"
  >
    <a-form-item :name="['user', 'name']" label="Name" :rules="[{ required: true }]">
      <a-input v-model:value="formState.user.name" />
    </a-form-item>
    <a-form-item :name="['user', 'introduction']" label="Introduction">
      <a-textarea v-model:value="formState.user.introduction" />
    </a-form-item>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive } from 'vue';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const formState = reactive({
  user: {
    name: '',
    email: '',
    introduction: '',
  },
});
const onFinish = values => {
  console.log('Success:', values);
};
</script>
