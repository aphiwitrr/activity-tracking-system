<template>
  <v-navigation-drawer
    v-model="drawer.isDrawerOpen"
    :rail="rail"
    @click.stop="rail = false"
    mobile-breakpoint="md"
  >
    <v-list-item prepend-icon="mdi-home" @click="router.push('/')">
      {{ t('home') }}
      <template #append>
        <v-btn
          v-if="isLargeScreen"
          icon="mdi-chevron-left"
          variant="text"
          @click.stop="rail = true"
        >
        </v-btn>
      </template>
    </v-list-item>
    <v-list>
      <v-divider></v-divider>
      <v-list-item prepend-icon="mdi-pencil">
        <p class="text-subtitle">{{ t('management') }}</p>
      </v-list-item>
      <v-list-item v-for="nav in navMenu" :key="nav.title" :to="nav.to">
        {{ t(nav.title) }}</v-list-item
      >
      <v-divider></v-divider>
    </v-list>
    <template #append>
      <v-row class="d-flex justify-space-between align-center px-2" no-gutters>
        <v-btn-group>
          <v-btn :icon="iconTheme" @click="toggleTheme"></v-btn>
        </v-btn-group>
        <p>{{ appVersion }}</p>
      </v-row>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import router from '@/router'
import { useDrawerStore } from '@/stores/drawer'
import { appVersion, isLargeScreen } from '@/utils/screenSize'
import { computed, ref } from 'vue'
import { useLocale, useTheme } from 'vuetify'

const drawer = useDrawerStore()
const { t } = useLocale()
const rail = ref(false)

const iconTheme = computed(() =>
  theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'
)

const navMenu = [
  { title: 'curriculums', to: 'MainIFAdmin' },
  { title: 'subject', to: '/manageSubject' },
  { title: 'skill', to: '/skillView' },
  { title: 'user', to: '/users' }
]
const theme = useTheme()
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'lightBUU' : 'darkBUU'
}
</script>
