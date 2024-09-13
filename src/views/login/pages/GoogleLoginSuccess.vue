<template>
  <v-container class="mx-auto">
    <v-row class="text-center text-h5">
      <v-col cols="12">
        <v-icon size="160" class="mb-3" round icon="mdi-check-bold" color="success"></v-icon>
      </v-col>
      <v-col cols="12">
        <p class="text-h3">Google login successful</p>
      </v-col>
      <v-col v-if="user">
        <p>Welcome, {{ user.name }}!</p>
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

const countdown = ref(3)
let intervalId: number | undefined
const auth = useAuthStore()
const user = auth.user

onMounted(async () => {
  intervalId = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(intervalId)
      router.push('/MainIFAdmin')
    }
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }
})
</script>
