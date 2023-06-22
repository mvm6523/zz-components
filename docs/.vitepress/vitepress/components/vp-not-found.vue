<script setup lang="ts">
import { isClient } from '@vueuse/core'

const goHome = () => {
  if (!isClient) return
  // window.location.href = `/${lang.value}/`
}
</script>

<template>
  <el-result icon="error" title="locale.title" sub-title="locale.desc">
    <template #extra>
      <el-button @click="goHome">{{ 222 }}</el-button>
    </template>
  </el-result>
</template>

<style scoped>
.el-result {
  height: 100vh;
  width: 100vw;
}
</style>
