<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  label: string
  fetchData: (search: string) => Promise<void>
}>()

const loading = ref(false)

const search = ref('')

// Watch for changes in props.search and update local search
watch(
  () => search,
  (newSearch) => {
    search.value = newSearch.value
  }
)
</script>

<template>
  <v-text-field
    :label="props.label"
    variant="outlined"
    :loading="loading"
    append-inner-icon="mdi-magnify"
    v-model="search"
    rounded="lg"
    @click:append-inner="fetchData(search)"
    @keydown.enter="fetchData(search)"
  ></v-text-field>
</template>
