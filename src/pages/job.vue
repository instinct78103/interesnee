<script setup>

import { SITE_NAME } from '@/helpers.js'

definePage({
  meta: {
    title: `${SITE_NAME} - Вакансия`,
  },
})

import BaseForm from '@/components/BaseForm.vue';
</script>

<template>
  <BaseForm />
</template>

<style scoped lang="scss">

</style>