<template>
  <section class="relative lg:flex">
    <HeaderVertical
      bg-color="dark-3"
      drawer-btn-color="warning"
      :header-width="220"
    >
      <template #content>
        <div class="px-3xs">
          <h2 class="text-center text-warning mb-sm">Typesense Search</h2>
          <div>
            <RouterLink to="/">
              <div class="text-center text-light-3 text-lg mb-sm">BOOKS</div>
            </RouterLink>
            <RouterLink to="/program-search">
              <div class="text-center text-light-3 text-lg mb-sm">PROGRAMS</div>
            </RouterLink>
            <RouterLink to="/embedded-search">
              <div class="text-center text-light-3 text-lg mb-sm">SEMANTIC</div>
            </RouterLink>
            <RouterLink to="/about">
              <div class="text-center text-light-3 text-lg">ABOUT</div>
            </RouterLink>
          </div>
        </div>
      </template>
      <template #mobile-content="{ headerClose }">
        <div class="px-3xs">
          <h2 class="text-center text-warning mb-sm">Typesense Search</h2>
          <div>
            <RouterLink to="/" @click="headerClose">
              <div class="text-center text-light-3 text-lg mb-sm">BOOKS</div>
            </RouterLink>
            <RouterLink to="/program-search" @click="headerClose">
              <div class="text-center text-light-3 text-lg mb-sm">PROGRAMS</div>
            </RouterLink>
            <RouterLink to="/about" @click="headerClose">
              <div class="text-center text-light-3 text-lg">ABOUT</div>
            </RouterLink>
          </div>
        </div>
      </template>
    </HeaderVertical>
    <div class="w-full bg-dark-1 relative min-h-screen">
      <div class="container px-2xs lg:px-xs mx-auto">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { HeaderVertical } from '@bobbykim/manguito-theme'
</script>

<style scoped></style>
