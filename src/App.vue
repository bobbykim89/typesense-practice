<script setup lang="ts">
import { RouterView } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
</script>

<template>
  <div>
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
  </div>
</template>

<style scoped></style>
