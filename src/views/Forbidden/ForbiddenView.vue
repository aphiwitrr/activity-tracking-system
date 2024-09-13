<template>
  <v-container class="mx-auto">
    <v-row no-gutters class="text-center text-h5">
      <v-col cols="12">
        <v-icon size="160" class="mb-3" round icon="mdi-block-helper" color="error"></v-icon>
      </v-col>
      <v-col cols="12">
        <h2 class="text-h1">403</h2>
        <p class="text-h3">Forbidden</p>
        <p>Access to this resource on the server is denied !</p>
      </v-col>
      <v-col cols="12">
        <p class="text-medium-emphasis">Redirect to home page in {{ countdown }} seconds</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref, onUnmounted } from 'vue'

const countdown = ref(5)
let intervalId: number | undefined
const user = ref()
const auth = useAuthStore()

onMounted(async () => {
  user.value = await auth.fetchProfile()

  intervalId = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(intervalId)
      router.back()
    }
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }
})
</script>
