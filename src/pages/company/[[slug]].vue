<script setup>
import {useRoute} from 'vue-router/auto';

const route = useRoute()
</script>

<template>
  {{route.params}}
</template>

<style scoped>

</style>