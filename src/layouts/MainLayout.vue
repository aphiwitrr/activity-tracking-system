<script setup lang="ts">
import MainAppBar from '../components/MainAppBar.vue'
import MainDrawer from '../components/MainDrawer.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <v-main app>
    <MainAppBar></MainAppBar>
    <MainDrawer v-if="auth.isAuthenticated" />
    <RouterView class="mx-auto overflow-y-auto" style="min-height: 900px" />
  </v-main>
</template>
