<script setup lang="ts">
import { ref } from "vue";
import { typesenseClient } from "../typesense";

const query = ref<string>("");
const results = ref<any>([]);

const search = async () => {
  if (query.value.length > 0) {
    try {
      const searchResults = await typesenseClient
        .collections("books")
        .documents()
        .search({ q: query.value, query_by: "title" });
      results.value = searchResults.hits?.map((hit) => hit.document);
      console.log(results.value);
    } catch (error) {
      console.error("Search error:", error);
    }
  } else {
    results.value = [];
  }
};
</script>

<template>
  <div>
    <input v-model="query" @input="search" placeholder="Search..." />
    <ul>
      <li v-for="item in results" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<style scoped>
input {
  padding: 0.5em;
  margin: 0.5em 0;
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5em 0;
}
</style>
