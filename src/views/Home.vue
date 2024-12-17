<template>
  <section class="relative py-sm">
    <div class="container px-2xs lg:px-xs mx-auto">
      <h2 class="text-center text-light-3 mb-sm">Book Search</h2>
      <div class="max-w-screen-lg py-sm px-xs bg-dark-3 rounded-md mx-auto">
        <Search />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Search from '../components/Search.vue'
</script>

<style scoped></style>
