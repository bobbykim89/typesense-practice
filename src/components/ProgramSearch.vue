<script setup lang="ts">
import { MclFormGroup, MclInputText } from '@bobbykim/mcl-forms'
import { ref } from 'vue'
import { typesenseClient } from '../typesense'

const query = ref<string>('')
const results = ref<any>([])

const search = async () => {
  if (query.value.length > 0) {
    try {
      const searchResults = await typesenseClient
        .collections('degree-seeking-programs')
        .documents()
        .search({
          q: query.value,
          query_by: 'title, category.title, college.title',
        })
      results.value = searchResults.hits?.map((hit) => hit.document)
      console.log(results.value)
    } catch (error) {
      console.error('Search error:', error)
    }
  } else {
    results.value = []
  }
}
const resetSearchResults = () => {
  query.value = ''
  results.value = []
}
</script>

<template>
  <div @keyup.esc="resetSearchResults">
    <form @submit.prevent="search">
      <MclFormGroup
        label="Search"
        label-for="search-input"
        text-color="light-1"
      >
        <div class="flex gap-2">
          <MclInputText
            class="w-full"
            id="search-input"
            v-model="query"
            placeholder="Search Query"
            rounded
            :display-highlight="false"
          ></MclInputText>
          <button
            class="text-light-1 bg-warning rounded-full aspect-square !w-[40px] !h-[40px] flex justify-center items-center focus:ring-4 ring-warning ring-offset-2 ring-offset-dark-3 transition-shadow duration-300 ease-linear"
            aria-label="search"
            role="button"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="aspect-square h-sm"
              fill="currentColor"
            >
              <!-- !Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
              <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              />
            </svg>
          </button>
          <button
            class="text-light-1 bg-danger rounded-full aspect-square !w-[40px] !h-[40px] flex justify-center items-center focus:ring-4 ring-danger ring-offset-2 ring-offset-dark-3 transition-shadow duration-300 ease-linear"
            aria-label="clear"
            role="button"
            type="reset"
            @click="resetSearchResults"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              class="aspect-square h-sm"
              fill="currentColor"
            >
              <!-- !Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
              <path
                d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
              />
            </svg>
          </button>
        </div>
      </MclFormGroup>
    </form>
    <div class="min-h-[30vh] bg-dark-1 rounded-md mt-xs px-2xs py-xs">
      <TransitionGroup name="fade" tag="ul">
        <li
          v-for="(item, idx) in results"
          :key="idx"
          class="mb-2xs last:mb-0 rounded-md bg-dark-3 px-xs py-2xs flex gap-6"
        >
          <img
            :src="item.degreeImage"
            :alt="item.alternateTitle"
            class="rounded-md w-3xl object-cover"
          />
          <div class="text-light-3">
            <p class="font-bold lg:text-lg mb-xs lg:mb-sm">
              {{ item.title }}
            </p>
            <p class="mb-2xs">{{ item.category.title }}</p>
            <p class="mb-2xs">{{ item.college.title }}</p>
            <p class="text-sm">Next start date: {{ item.nextStartDate }}</p>
          </div>
        </li>
        <li v-if="results.length === 0" class="text-center text-light-3">
          No results...
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
