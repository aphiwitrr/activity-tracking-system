<template>
  <v-list>
    <v-list-item prepend-icon="mdi-cog-box" slim>
      <p class="text-subtitle">{{ t('management') }}</p>
    </v-list-item>
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
  { title: 'curriculums', to: 'MainIFAdmin' },
  { title: 'subject', to: '/manageSubject' },
  { title: 'skill', to: '/skillView' },
  { title: 'user', to: '/users' }
]
</script>
