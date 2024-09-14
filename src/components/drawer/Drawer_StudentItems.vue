<template>
  <v-list>
    <v-list-item v-for="nav in navMenu" :key="nav.title" :to="nav.to">
      {{ t(nav.title) }}</v-list-item
    >
    <v-divider></v-divider>
  </v-list>
</template>

<script lang="ts" setup>
import { useLocale } from 'vuetify'
const { t } = useLocale()

const navMenu = [
  { title: 'profile', to: '/profile' },
  { title: 'skills', to: '/student/skills' },
  { title: 'help', to: '/student/help' }
]
</script>
